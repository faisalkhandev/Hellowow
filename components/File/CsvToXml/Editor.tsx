
"use client"

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import AceEditor from 'react-ace';
import { Button } from '../../ui/button';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing

const Editor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvInput, setCsvInput] = useState<string>(''); // State for CSV input
  const [xmlOutput, setXmlOutput] = useState<string>(''); // State for XML output
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // State for download link

  // Function to convert JSON data to XML
  const jsonToXml = (jsonData: Record<string, unknown>[]): string => {
    let xml = `<rows>\n`;
    jsonData.forEach((row) => {
      xml += `<row>\n`;
      Object.entries(row).forEach(([key, value]) => {
        xml += `<${key}>${value}</${key}>\n`;
      });
      xml += `</row>\n`;
    });
    xml += `</rows>`;
    return xml;
  };

  const handleConvert = () => {
    try {
      const result = Papa.parse<Record<string, unknown>>(csvInput, { header: true });
      const jsonData: Record<string, unknown>[] = result.data as Record<string, unknown>[]; // Explicitly cast to the expected type
      if (jsonData.length === 0) {
        throw new Error('Empty or invalid CSV data');
      }
      const xmlData = jsonToXml(jsonData); // Convert JSON to XML using custom function
      setXmlOutput(xmlData); // Set the XML output
      setDownloadLink(null);
    } catch (error) {
      setXmlOutput("Invalid CSV input. Please check your CSV format.");
      console.error("Conversion error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csvData = event.target?.result as string;
          setCsvInput(csvData)
          const result = Papa.parse<Record<string, unknown>>(csvData, { header: true });
          const jsonData: Record<string, unknown>[] = result.data as Record<string, unknown>[]; // Explicitly cast to the expected type
          if (jsonData.length === 0) {
            throw new Error('Empty or invalid CSV file');
          }
          const xmlData = jsonToXml(jsonData);
          setXmlOutput(xmlData);
          const blob = new Blob([xmlData], { type: 'application/xml' });
          const url = URL.createObjectURL(blob);
          setDownloadLink(url); 
        } catch (error) {
          setXmlOutput("Invalid CSV file. Please check your file format.");
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
      setXmlOutput('');
      setCsvInput(''); // Clear the XML output in the editor
       // Clear the XML output in the editor
    }
  };

  return (
    <Card className="pt-6 px-0 max-container">
      <CardHeader className=" max-lg:px-1 font-poppin text-[1rem] sm:text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
        Copy-paste your CSV string here:
      </CardHeader>
      <CardContent className='py-1 max-lg:px-1 '>
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
      <CardFooter className='max-lg:px-1 flex flex-col items-start space-y-1 py-2'>
        <div className="font-poppin text-[1rem] sm:text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
          Results:
        </div>
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