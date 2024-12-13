'use client';

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import AceEditor from 'react-ace';
import { Button } from '../../ui/button';
import * as Papa from 'papaparse'; // Import PapaParse for CSV parsing

const Editor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvInput, setCsvInput] = useState<string>(''); // State for CSV input
  const [jsonOutput, setJsonOutput] = useState<string>(''); // State for JSON output
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // State for download link

  const handleConvert = () => {
    try {
      const jsonData = Papa.parse(csvInput, { header: true }); // Parse the CSV input
      const blob = new Blob([JSON.stringify(jsonData.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
      setJsonOutput(JSON.stringify(jsonData.data, null, 2)); // Set the JSON output
    } catch (error) {
      setJsonOutput("Invalid CSV input. Please check your CSV format.");
      console.error("Conversion error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csvData = event.target?.result as string; // Get the CSV data from the file
          const jsonData = Papa.parse(csvData, { header: true }); // Parse the CSV data
          setJsonOutput(JSON.stringify(jsonData.data, null, 2)); // Set the JSON output
          
          // Create a Blob for the JSON data and set the download link
          const blob = new Blob([JSON.stringify(jsonData.data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          setDownloadLink(url); // Set the download link
        } catch (error) {
          setJsonOutput("Invalid CSV file. Please check your file format.");
          console.error("File read error:", error);
        }
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  const handleDownload = () => {
    if (downloadLink) {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = 'converted.json'; // Set the default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadLink); // Clean up the URL object
      setDownloadLink(null); // Reset download link after download
      setJsonOutput(''); // Clear the JSON output in the editor
    }
  };

  return (
    <Card className="pt-6 px-0 max-container">
      <CardHeader className="max-lg:px-2 font-poppin text-[1rem] sm:text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
        Copy-paste your CSV string here:
      </CardHeader>
      <CardContent className='py-1 max-lg:px-2'>
        <div className="w-full text-[0.8rem] border text-black relative overflow-hidden">
          <AceEditor
            style={{ width: '100%', height: "400px" }}
            mode="csv" // Change mode to CSV
            theme="github"
            name="csv-editor"
            editorProps={{ $blockScrolling: true }}
            value={csvInput} // Bind the value to state
            onChange={setCsvInput} // Update state on change
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showPrintMargin: false,
            }}
          />
        </div>
        <div className="flex justify-between items-center py-4 gap-4">
          <Button className='whitespace-pre-wrap h-14 md:h-10' onClick={handleConvert}>
            Convert your String
          </Button>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="font-poppin h-14 md:h-10 border whitespace-pre-wrap flex gap-1 items-center border-[#1A8FE3] hover:bg-primary hover:text-white"
          >
            Upload and Convert
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv" // Ensure only CSV files can be selected
            onChange={handleFileChange} // Handle file change
            style={{ display: 'none' }}
          />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start space-y-1 py-2 max-lg:px-2'>
        <div className="font-poppin text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
          Results:
        </div>
        <div className="w-full text-[0.8rem] border text-black relative overflow-hidden">
          <AceEditor
            style={{ width: '100%', height: "400px" }}
            mode="json" // Change mode to JSON
            theme="github"
            name="json-editor"
            editorProps={{ $blockScrolling: true }}
            value={jsonOutput} // Bind the value to state
            readOnly={true} // Make this editor read-only
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showPrintMargin: false,
            }}
          />
        </div>
        {downloadLink && ( // Show download button if there is a download link
          <Button onClick={handleDownload} className="mt-2">
            Download JSON
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Editor;