'use client';

import React, { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Button } from '../ui/button';

const Editor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
//   const [files, setFiles] = useState<File[]>([]);

  return (
    <Card className="pt-6 px-0">
      <CardHeader className="font-poppin text-[1.4rem] text-paragraph font-[500] py-0 leading-[1.6rem]">
        Copy-paste your string here:
      </CardHeader>
      <CardContent className='py-1'>
        <div className="w-full h-[400px] text-[0.8rem] border text-black relative overflow-hidden">
        <style>
        {`
          .ace_active-line {
            background-color: #f0f0f0 !important;
          }

          /* Line number styles */
          .ace_gutter {
            background: #f9f9f9;
            color: #000 !important; /* Change line number color to black */
          }
        `}
        </style>
          {/* Ace Editor */}
          <AceEditor
            style={{ width: '100%', height: '100%' }}
            mode="java"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showPrintMargin: false, // This will hide the vertical line
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center py-4 gap-4">
        <Button className='whitespace-pre-wrap h-14 md:h-10 '>Convert your String</Button>
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
          accept="application/pdf"
          multiple
        //   onChange={(e) => {
        //     if (e.target.files) {
        //       const newFiles = Array.from(e.target.files);
        //       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        //     }
        //   }}
          style={{ display: 'none' }}
        />
      </CardFooter>
    </Card>
  );
};

export default Editor;
