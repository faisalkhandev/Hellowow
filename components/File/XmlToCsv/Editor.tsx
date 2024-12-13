'use client';

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import AceEditor from 'react-ace';
import { Button } from '../../ui/button';
import { XMLParser } from 'fast-xml-parser'; // Import fast-xml-parser
import { Parser as Json2CsvParser } from 'json2csv'; // Import json2csv

const XmlToCsvConverter: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [xmlInput, setXmlInput] = useState<string>(''); // State for XML input
  const [csvOutput, setCsvOutput] = useState<string>(''); // State for CSV output
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // State for download link
  const [converting, setIsConverting] = useState<boolean>(false); // State for converting status

  const handleConvert = async () => {
    setIsConverting(true); // Set converting state to true

    try {
      // Parse XML input using fast-xml-parser
      const parser = new XMLParser();
      const jsonData = parser.parse(xmlInput); // Parse the XML input
      console.log("Parsed JSON Data:", jsonData); // Log the parsed JSON data

      // Convert JSON to CSV using json2csv
      const json2csvParser = new Json2CsvParser();
      const csvData = json2csvParser.parse(jsonData); // Convert JSON to CSV
      setCsvOutput(csvData); // Set the CSV output

      // Create a Blob for the CSV data and set the download link
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url); // Set the download link
    } catch (error) {
      setCsvOutput("Invalid XML input. Please check your XML format.");
      console.error("Conversion error:", error);
    } finally {
      setIsConverting(false); // Ensure converting state is set to false in all cases
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const xmlData = event.target?.result as string; // Get XML data from file
          setXmlInput(xmlData); // Set XML input
        } catch (error) {
          setCsvOutput("Invalid XML file. Please check your file format.");
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
      link.download = 'converted.csv'; // Set the default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadLink); // Clean up the URL object
      setDownloadLink(null); // Reset download link after download
      setCsvOutput(''); // Clear the CSV output in the editor
    }
  };

  return (
    <Card className="pt-6 px-0 max-container">
      <CardHeader className=" max-lg:px-2 font-poppin max-lg:text-[1rem] text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
        Copy-paste your XML string here:
      </CardHeader>
      <CardContent className='py-1 max-lg:px-2'>
        <div className="w-full text-[0.8rem] border text-black relative overflow-hidden">
          <AceEditor
            style={{ width: '100%', height: "400px" }}
            mode="xml" // Change mode to XML
            theme="github"
            name="xml-editor"
            editorProps={{ $blockScrolling: true }}
            value={xmlInput} // Bind the value to state
            onChange={setXmlInput} // Update state on change
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
            {
              converting ? 'Converting...' : 'Convert to CSV'
            }
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
            accept="application/xml" // Ensure only XML files can be selected
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
            mode="text" // Change mode to text for CSV output
            theme="github"
            name="csv-editor"
            editorProps={{ $blockScrolling: true }}
            value={csvOutput} // Bind the value to state
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
            Download CSV
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default XmlToCsvConverter;