"use client";

import { convertXMLToExcel } from "@/actions/file/xml-to-excel";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import AceEditor from 'react-ace';
import { utils, write } from "xlsx";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for XML files

export default function XmlToExcelConverter() {
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [convertedFile, setConvertedFile] = useState<{
        blob: Blob;
        name: string;
    } | null>(null);
    const editorRef = useRef<AceEditor | null>(null);

    const resetState = () => {
        setSelectedFile(null);
        setError("");
        setConvertedFile(null);
        if (convertedFile) {
            URL.revokeObjectURL(URL.createObjectURL(convertedFile.blob));
        }
    };
console.log(selectedFile);

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

    const handleConversion = async () => {
        if (!selectedFile) return;

        setIsConverting(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
console.log(formData);

            const response = await convertXMLToExcel(formData);

            const blob = new Blob([response], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            setConvertedFile({
                blob,
                name: `${selectedFile.name.replace(/\.xml$/i, "")}.xlsx`,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to convert file. Please try again.");
            console.error(err);
        } finally {
            setIsConverting(false);
        }
    };
    const convertEditorTextToExcel = () => {
        const xmlString = editorRef.current?.editor.getValue();
        if (!xmlString) {
            setError("No text found in the editor to convert.");
            return;
        }
    
        // Validate XML format
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            
            // Check for parsing errors
            const parseError = xmlDoc.getElementsByTagName("parsererror");
            if (parseError.length > 0) {
                throw new Error("Invalid XML format.");
            }
        } catch (error) {
            setError("Invalid XML format. Please check your XML string.");
            return;
        }
    
        const workbook = utils.book_new();
        const rows = xmlString.split('\n').map(row => [row]); // Each line becomes a new row
        const worksheet = utils.aoa_to_sheet(rows);
        utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        const blob = new Blob([write(workbook, { bookType: "xlsx", type: "array" })], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    
        setConvertedFile({
            blob,
            name: "converted_text.xlsx",
        });
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
        },
        []
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "application/xml": [".xml"],
            "text/xml": [".xml"],
        },
        multiple: false,
        maxSize: MAX_FILE_SIZE,
    });

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div>
                {/* Upload Area */}
                {!convertedFile && (
                    <Card className="pt-6 px-0">
                        <CardHeader className="font-poppin text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
                            Copy-paste your XML string here:
                        </CardHeader>
                        <CardContent className='py-1'>
                            <div className="w-full h-[400px] text-[0.8rem] border text-black relative overflow-hidden">
                                <style>
                                    {`
                                        .ace_active-line {
                                            background-color: #f0f0f0 !important;
                                        }
                                        .ace_gutter {
                                            background: #f9f9f9;
                                            color: #000 !important;
                                        }
                                    `}
                                </style>
                                <AceEditor
                                    ref={editorRef}
                                    style={{ width: '100%', height: '100%' }}
                                    mode="xml"
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
                        <CardFooter className="flex justify-between items-center py-4 gap-4">
                            <Button
                                className='whitespace-pre-wrap h-14 md:h-10 transition-colors'
                                onClick={convertEditorTextToExcel}
                            >
                                {isConverting ? 'Converting...' : 'Convert your XML'}
                            </Button>
                            <Button
                                size="sm"
                                className="font-poppin h-14 md:h-10 border whitespace-pre-wrap flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                Upload and Convert
                            </Button>
                            <input
                                {...getInputProps()}
                                id="file-input"
                                type="file"
                                accept=".xml"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const newFile = e.target.files[0];
                                        setSelectedFile(newFile);
                                    }
                                }}
                            />
                        </CardFooter>
                    </Card>
                )}

                {/* Selected File Info */}
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
                         {isConverting ? "Converting..." : "Convert to Excel"}
                       </Button>
                     </div>
                   </div>
                 </div>
                )}

                {/* Converted File Download */}
                {convertedFile && (
                    <div className="text-center">
                        <div className="mb-6">
                            <svg
                                className="w-16 h-16 mx-auto text-green-500"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-white text-xl font-medium mt-4">
                                Conversion Complete!
                            </h3>
                            <p className="text-gray-400 mt-2">
                                Your file has been converted successfully
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleDownload}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
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
                                <span>Download Excel</span>
                            </button>
                            <button
                                onClick={resetState}
                                className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Convert Another File
                            </button>
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
        </div>
    );
}