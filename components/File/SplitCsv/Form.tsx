"use client";

import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import JSZip from "jszip";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const CsvSplitter = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [rowsPerFile, setRowsPerFile] = useState<number>(100); // Default rows per file
  const [isSplitting, setIsSplitting] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<{ name: string; blob: Blob }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "text/csv": [".csv"],
      "application/csv": [".csv"],
    }, // Accept CSV files
  });

  const resetState = () => {
    setFiles([]);
    setError("");
    setGeneratedFiles([]);
    setSuccess("");
  };

  const handleSplit = async () => {
    setIsSplitting(true);
    setGeneratedFiles([]); // Clear previous files

    if (files.length === 0 || rowsPerFile <= 0) {
      setIsSplitting(false);
      setError("Please upload a valid CSV file and specify rows per file.");
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result;

      try {
        // Parse CSV data using PapaParse
        const parsedData = Papa.parse(data as string, { header: false });
        const rows = parsedData.data;

        const chunkedData = [];

        // Split rows by the specified number
        for (let i = 0; i < rows.length; i += rowsPerFile) {
          chunkedData.push(rows.slice(i, i + rowsPerFile));
        }

        // Save each chunk as a separate file
        const newFiles = chunkedData.map((chunk, index) => {
          const csvContent = Papa.unparse(chunk); // Convert chunk back to CSV format
          const fileName = `split_file_${index + 1}.csv`;
          const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

          return { name: fileName, blob };
        });

        setGeneratedFiles(newFiles); // Update the generated files state
        setSuccess("Files are ready to download."); // Notify user that files are ready
      } catch (error) {
        setError("Error processing the file. Please try again."); // Notify user about the error
        console.error(error);
      } finally {
        setIsSplitting(false); // Reset the splitting state after completion
      }
    };

    reader.readAsText(file); // Read the file as text
  };

  

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    generatedFiles.forEach((file) => {
      zip.file(file.name, file.blob);
    });

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "split_files.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {!files.length && (
          <Card className="w-full h-[450px] shadow-2xl border-none max-w-[940px] mx-auto">
            <div className="flex px-4 flex-col justify-center items-center space-y-4 h-full">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex gap-2 text-white font-poppin text-[1rem] font-[600] h-14  w-full max-w-[320px]"
              >
                Upload CSV File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={(e) => {
                  if (e.target.files) {
                    const newFiles = Array.from(e.target.files);
                    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                  }
                }}
                style={{ display: "none" }}
              />
              <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
                <input {...getInputProps()} />
                <p className="font-poppin text-[1rem] text-paragraph font-[400]">
                  {isDragActive ? "Drop the CSV file here..." : "or Drag files here"}
                </p>
              </div>
            </div>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
          </Card>
        )}
        {files.length > 0 && generatedFiles.length === 0 && (
          <Card className="flex w-full max-w-[940px] justify-center items-center h-[450px] shadow-2xl border-none mx-auto">
            <div className="flex max-lg:flex-col max-lg:items-center gap-3 items-end">
              <div className="w-[250px] space-y-1">
                <Label className="text-[0.78rem] text-paragraph">Rows Per File</Label>
                <Input
                  type="number"
                  value={rowsPerFile}
                  onChange={(e) => setRowsPerFile(Number(e.target.value))}
                  className="border border-gray-400 h-10"
                />
              </div>
              <Button onClick={handleSplit} size="lg" className="h-10">
                {isSplitting ? "Splitting..." : "Split"}
              </Button>
            </div>
            {error && <FormError message={error} />}
          </Card>
        )}
        {generatedFiles.length > 0 && (
          <Card className="flex w-full max-w-[940px] justify-center items-center h-[450px] shadow-2xl border-none mx-auto">
              <div className="text-center">
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
                <p className="text-gray-400 mt-2 text-center">
                  Split successfully
                </p>
              </div>
<div className="flex gap-2 max-lg:flex-col items-end">
              <Button onClick={handleDownloadAll} size="lg">
                Download All as Zip
              </Button>
              <div className="flex justify-center items-end space-x-4 mt-3">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={resetState}
                >
                  Convert Another File
                </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default CsvSplitter;