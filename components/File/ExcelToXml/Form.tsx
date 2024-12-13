"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FolderUp } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx"; // Import the xlsx library for Excel file handling
import { json2xml } from "xml-js"; // Import the library for JSON to XML conversion

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ExcelToXmlConverter() {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);

  const resetState = () => {
    setSelectedFile(null);
    setError("");
    setConvertedFile(null);
    // Cleanup any existing object URLs
    if (convertedFile) {
      URL.revokeObjectURL(URL.createObjectURL(convertedFile));
    }
  };

  const handleConversion = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError("");
    setConvertedFile(null);

    try {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

            if (jsonData.length === 0) {
                throw new Error("The selected Excel file is empty.");
            }

            const headers = jsonData[0] as string[];
            const dataRows = jsonData.slice(1);

            const structuredData = dataRows.map((row) => {
                return headers.reduce((acc, header, index) => {
                    acc[header] = row[index] ?? null;
                    return acc;
                }, {} as Record<string, unknown>);
            });

            // Convert structured data to a JSON string before passing it to `json2xml`
            const jsonDataString = JSON.stringify({ root: structuredData });
            const xmlData = json2xml(jsonDataString, { compact: true, ignoreComment: true, spaces: 4 });

            const blob = new Blob([xmlData], { type: "application/xml" });
            setConvertedFile(blob);
        };
        reader.readAsArrayBuffer(selectedFile);
    } catch (err) {
        setError(
            err instanceof Error
                ? err.message
                : "Failed to convert file. Please try again."
        );
        console.error("Conversion error:", err);
    } finally {
        setIsConverting(false);
    }
};



  const handleDownload = () => {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.xml"; // Set the default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    resetState();

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 10MB limit");
      return;
    }

    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <>
       <Card className="w-full max-w-[940px] mx-auto shadow-2xl h-[400px]">
       <div className={`rounded-lg px-4 ${!selectedFile ? 'h-full' : 'h-[300px]'}`}>
          {/* Upload Area */}
          {!convertedFile && (
            <>
              <div
                {...getRootProps()}
                className={`h-full flex flex-col justify-center items-center space-y-3 rounded-lg cursor-pointer transition-colors`}
              >
                <input {...getInputProps()} />
                <Button className='flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14 w-full max-w-[320px]'>
                  <FolderUp size={18} strokeWidth={3} />
                  Upload Excel File
                </Button>
                <p className="text-gray-300">or Drag files here</p>
                <p className="text-gray-400 text-sm mt-2">
                  Maximum file size: 10MB
                </p>
              </div>

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
                    {isConverting ? "Converting..." : "Convert to XML"}
                  </Button>
                </div>
              </div>
            </div>)
          }


              
              {selectedFile && !convertedFile && (
            <div className="m-4">
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
                    {isConverting ? "Converting..." : "Convert to XML"}
                  </Button>
                </div>
              </div>
            </div>
          )}
            </>
          )}

          {/* Selected File Info */}
          {/* {selectedFile && !convertedFile && (
            <div className="m-4">
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-8 h-8 text-green-500"
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
                    <p className="text-white font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-gray-400 text-sm">
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
                    className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConversion();
                    }}
                    disabled={isConverting}
                    className={`px-4 py-2 rounded-lg transition-colors`}
                  >
                    {isConverting ? "Converting..." : "Convert to XML"}
                  </Button>
                </div>
              </div>
            </div>
          )} */}

          {/* Converted File Download */}
          {convertedFile && (
            <div className="text-center h-full flex flex-col justify-center">
              <div className="mb-6">
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

              <div className="flex justify-center space-x-4">
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
                  <span>Download XML</span>
                </Button>
                <Button
                variant="ghost"
                  onClick={resetState}
                  className="h-12"
                  // className="bg-gray-700 h-12 text-white px-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Convert Another File
                </Button>
              </div>
            </div>
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
      </Card>
    </>
  );
}