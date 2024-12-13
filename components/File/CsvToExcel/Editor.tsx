"use client";

import { convertTextToExcel } from "@/actions/file/action"; // Ensure this function is correctly implemented
import { convertCSVToExcel } from "@/actions/file/action"; // Ensure this function is correctly implemented
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import AceEditor from "react-ace";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for CSV files

interface CSVPreview {
  headers: string[];
  sample: string[][];
  totalRows: number;
}

export default function CombinedEditor() {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CSVPreview | null>(null);
  const [convertedFile, setConvertedFile] = useState<{
    blob: Blob;
    name: string;
  } | null>(null);
  const [delimiter, setDelimiter] = useState<string>(",");
  const editorRef = useRef<AceEditor | null>(null); // Create a ref for the AceEditor

  const resetState = () => {
    setSelectedFile(null);
    setError("");
    setPreview(null);
    setConvertedFile(null);
    setDelimiter(",");
  };

  const handleDownload = () => {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = convertedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const previewCSV = async (file: File) => {
    try {
      const text = await readFileContent(file);
      const lines = text.split("\n").filter((line) => line.trim());
      const sampleSize = Math.min(5, lines.length - 1);

      const headers = lines[0].split(delimiter).map((header) => header.trim());
      const sample = lines
        .slice(1, sampleSize + 1)
        .map((line) => line.split(delimiter).map((cell) => cell.trim()));

      setPreview({
        headers,
        sample,
        totalRows: lines.length - 1,
      });
    } catch (err) {
      setError("Failed to preview CSV file");
      console.error(err);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleConversion = async () => {
    setIsConverting(true);
    setError("");

    try {
      if (selectedFile) {
        // If a file is selected, convert the CSV
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("delimiter", delimiter);

        const response = await convertCSVToExcel(formData);
        const blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        setConvertedFile({
          blob,
          name: `${selectedFile.name.replace(/\.csv$/i, "")}.xlsx`,
        });
      } else if (editorRef.current) {
        // If text is in the editor, convert that
        const text = editorRef.current.editor.getValue();
        if (text) {
          const blob = await convertTextToExcel(text, delimiter);
          setConvertedFile({
            blob,
            name: "converted_text.xlsx",
          });
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to convert file. Please try again."
      );
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      resetState();

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 50MB limit");
        return;
      }

      setSelectedFile(file);
      await previewCSV(file);
    },
    [delimiter]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });
  const handleConvertStringToCSV = async () => {
    setIsConverting(true); // Set to true when starting conversion
  
    if (editorRef.current) {
      const text = editorRef.current.editor.getValue(); // Get the value from the editor
      if (text) {
        // Validate CSV format
        const isValidCSV = validateCSV(text, delimiter);
        if (!isValidCSV) {
          setError("Invalid CSV format. Please check your input.");
          setIsConverting(false); // Set back to false if there's an error
          return;
        }
  
        try {
          // Simulate a delay for the conversion process
          const blob = await convertTextToExcel(text, delimiter); // Convert text to Excel
          setConvertedFile({
            blob,
            name: "converted_text.xlsx", // Set the filename
          });
        } catch (error) {
          console.error("Error during conversion:", error);
          setError("Failed to convert text to Excel");
        } finally {
          setIsConverting(false); // Ensure to set isConverting to false after the conversion process
        }
      } else {
        setIsConverting(false); // Set back to false if there's no text
      }
    } else {
      setIsConverting(false); // Set back to false if editorRef is not current
    }
  };

  // Function to validate CSV format
  const validateCSV = (text: string, delimiter: string): boolean => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length === 0) return false;

    // Check if all lines have the same number of columns
    const columnCount = lines[0].split(delimiter).length;
    for (const line of lines) {
      const currentColumnCount = line.split(delimiter).length;
      if (currentColumnCount !== columnCount) {
        return false; // Inconsistent number of columns
      }
    }
    return true; // Valid CSV format
  };
  return (
    <div className="max-w-4xl mx-auto sm:p-8">
      {!convertedFile && (
        <Card className="pt-6 px-0">
          <CardHeader className="max-lg:px-2 font-poppin text-[1rem]  sm:text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
            Copy-paste your string here:
          </CardHeader>
          <CardContent className="py-1 max-lg:px-2">
            <div className="w-full h-[400px] text-[0.8rem] border text-black relative overflow-hidden">
              <style>
                {`
                .ace_active-line {
                  background-color: #f0f0f0 !important;
                }
                .ace_gutter {
                  background: #f9f9f9;
                  color: #000 !important; /* Change line number color to black */
                }
              `}
              </style>
              {/* Ace Editor */}
              <AceEditor
                ref={editorRef}
                style={{ width: "100%", height: "100%" }}
                mode="java"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showPrintMargin: false,
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center py-4 gap-4 max-lg:px-2">
            <Button
              className="whitespace-pre-wrap h-14 md:h-10 transition-colors"
              onClick={handleConvertStringToCSV}
              disabled={isConverting}
            >
              {isConverting ? "Converting..." : "Convert to Excel"}
            </Button>
            <Button
              size="sm"
              className="font-poppin h-14 md:h-10 border whitespace-pre-wrap flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
              onClick={() => document.getElementById("file-input")?.click()} // Trigger file input click
            >
              Upload CSV File
            </Button>
            <input
              {...getInputProps()}
              id="file-input" // Added ID for the input
              type="file"
              accept=".csv" // Ensure only CSV files can be selected
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files) {
                  const newFile = e.target.files[0];
                  setSelectedFile(newFile);
                  previewCSV(newFile);
                }
              }}
            />
          </CardFooter>
        </Card>
      )}

      {/* Preview Section */}
      {preview && !convertedFile && (
        <div className="mt-6 bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="bg-gray-800">
                  {preview.headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.sample.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-gray-600">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Total rows: {preview.totalRows.toLocaleString()}
          </p>
        </div>
      )}


{
             selectedFile && !convertedFile && (
              <div className="block sm:hidden">
              <div className="bg-blue-300 border rounded-md p-3">
                {
                  selectedFile && !convertedFile && (
                    <div className="flex items-center space-x-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-poppin text-white text-[0.89rem]  font-[400]">
                        {selectedFile.name}
                      </p>
                      <p className="font-poppin text-white  font-[400] text-sm">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  )
                }
              </div>
              <div>
              <div className="flex justify-between space-x-2 mt-2">
                  <Button 
                  variant="ghost"
                  size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetState();
                    }}
                    className=" hover:text-primary transition-colors h-8 py-1 rounded-lg"
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConversion();
                    }}
                    disabled={isConverting}
                    className={`px-4 py-2 rounded-lg h-8 transition-colors `}
                  >
                    {isConverting ? "Converting..." : "Convert to Excel"}
                  </Button>
                </div>
              </div>
            </div>)
          }







     {selectedFile && !convertedFile && (
            <div className="mt-3">
              <div className="flex items-center justify-between bg-blue-300  p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p className="font-poppin text-white  font-[400]">
                      {selectedFile.name}
                    </p>
                    <p className="font-poppin text-white  font-[400] text-sm">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetState();
                    }}
                    className="text-white hover:text-primary transition-colors px-3 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConversion();
                    }}
                    disabled={isConverting}
                    className={`px-4 py-2 rounded-lg transition-colors `}
                  >
                    {isConverting ? "Converting..." : "Convert to Excel"}
                  </Button>
                </div>
              </div>
            </div>
          )}
      {/* Converted File Download */}
      {/* Converted File Download */}
      {convertedFile && (
        <Card className="text-center h-[400px] flex  flex-col justify-center">
          <div className="mb-6 font-poppin">
            <svg
              className="w-16 h-16 mx-auto text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-paragraph text-xl font-medium mt-4">
              Conversion Complete!
            </h3>
            <p className="text-gray-400 mt-2">
              Your file has been converted successfully
            </p>
          </div>

          <div className="flex max-lg:flex-col justify-center space-x-4 font-poppin">
            <Button
              onClick={handleDownload}
              className="h-12 px-3 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Download PDF</span>
            </Button>
            <Button variant="ghost" className="h-12 px-3" onClick={resetState}>
              Convert Another File
            </Button>
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
