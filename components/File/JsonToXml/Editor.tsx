'use client';

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import AceEditor from 'react-ace';
import { Button } from '../../ui/button';
import { json2xml } from 'xml-js'; // Import the library for JSON to XML conversion

const Editor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [jsonInput, setJsonInput] = useState<string>(''); // State for JSON input
  const [xmlOutput, setXmlOutput] = useState<string>(''); // State for XML output
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // State for download link
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages

  const handleConvert = () => {
    setErrorMessage(''); // Reset error message
    try {
      const jsonData = JSON.parse(jsonInput); // Parse the JSON input
      const xmlData = json2xml(jsonData, { compact: true, ignoreComment: true, spaces: 4 }); // Convert JSON to XML
      setXmlOutput(xmlData); // Set the XML output
      setDownloadLink(null); // Reset download link
    } catch (error) {
      setErrorMessage("Invalid JSON input. Please check your JSON format.");
      console.error("Conversion error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string); // Parse the JSON from the file
          const xmlData = json2xml(jsonData, { compact: true, ignoreComment: true, spaces: 4 }); // Convert JSON to XML
          setXmlOutput(xmlData); // Set the XML output
          
          // Create a Blob for the XML data and set the download link
          const blob = new Blob([xmlData], { type: 'application/xml' });
          const url = URL.createObjectURL(blob);
          setDownloadLink(url); // Set the download link
          setErrorMessage(''); // Reset error message
        } catch (error) {
          setXmlOutput("");
          setErrorMessage("Invalid JSON file. Please check your file format.");
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
      link.download = 'converted.xml'; // Set the default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadLink); // Clean up the URL object
      setDownloadLink(null); // Reset download link after download
      setXmlOutput(''); // Clear the XML output in the editor
    }
  };

  return (
    <Card className="pt-6 px-0 max-container">
      <CardHeader className="font-poppin text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
        Copy-paste your JSON string here:
      </CardHeader>
      <CardContent className='py-1'>
        <div className="w-full text-[0.8rem] border text-black relative overflow-hidden">
          <AceEditor
            style={{ width: '100%', height: "400px" }}
            mode="json" // Change mode to JSON
            theme="github"
            name="json-editor"
            editorProps={{ $blockScrolling: true }}
            value={jsonInput} // Bind the value to state
            onChange={setJsonInput} // Update state on change
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
            accept="application/json" // Ensure only JSON files can be selected
            onChange={handleFileChange} // Handle file change
            style={{ display: 'none' }}
          />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start space-y-1 py-2'>
        <div className="font-poppin text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
          Results:
        </div>
        {errorMessage && (
          <div className="text-red-500">{errorMessage}</div> // Display error message
        )}
        <div className="w-full text-[0.8rem] border text-black relative overflow-hidden">
          <AceEditor
            style={{ width: '100%', height: "400px" }}
            mode="xml" // Change mode to XML
            theme="github"
            name="xml-editor"
            editorProps={{ $blockScrolling: true }}
            value={xmlOutput} // Bind the value to state
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
            Download XML
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Editor;