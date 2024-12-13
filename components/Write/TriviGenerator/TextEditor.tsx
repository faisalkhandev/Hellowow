"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import TooltipButton from '../../common/TooltipButton';
import { BeatLoader } from "react-spinners";
import { useTheme } from 'next-themes';

interface EditorProps {
  generatedText: string | null;
}

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      // Custom handlers can be added if needed
    }
  }
};

export default function Editor({ generatedText }: EditorProps) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState<string | null>(generatedText);

  useEffect(() => {
    setEditorContent(generatedText);
  }, [generatedText]);



  const isDisabled = !editorContent;

  return (
    <div className="editor-container invisible-scrollbar" style={{ width: '100%', height: '430px', maxHeight: '430px', borderRadius: "8px", position: 'relative' }}>
      <style>{`
        .ql-toolbar .ql-stroke {
          fill: none !important;
          stroke: #A2A4A5 !important;
        
        }
        .ql-toolbar .ql-fill {
          fill: #A2A4A5 !important;
          stroke: none !important;
        }
          .ql-button{
           color: #A2A4A5 !important;
          }
        .ql-toolbar .ql-picker {
          color: #A2A4A5 !important;
        }
 
        .editor-content {
        color: ${theme === 'dark' ? 'white' : '#707375'};
       }
   .ql-container {
    font-family: 'Poppin', sans-serif !important; /* Ensure the font is properly defined */
    font-size: 14px !important; /* Add semicolon here */
}
    
      `}</style>

      {loading && (
        <div className='w-full h-full flex justify-center items-center absolute z-50'>
          <BeatLoader color='#1A8FE3' margin='0' />
        </div>
      )}

      {/* Custom Toolbar */}
      <div id="toolbar" className="hidden  mt-2 gap-2 w-full">
        <TooltipButton tooltipContent="Heading 1">
          <button className="ql-header" value="1" disabled={isDisabled}>H1</button>
        </TooltipButton>
        <TooltipButton tooltipContent="Heading 2">
          <button className="ql-header" value="2" disabled={isDisabled}>H2</button>
        </TooltipButton>
        <TooltipButton tooltipContent="Bold (CTRL+B)">
          <button className="ql-bold" disabled={isDisabled}>B</button>
        </TooltipButton>
        <TooltipButton tooltipContent="Italic (CTRL+I)">
          <button className="ql-italic" disabled={isDisabled}>I</button>
        </TooltipButton>
       
      </div>

      <ReactQuill
        modules={modules}
        value={editorContent||""}
        onChange={(content) => {
          setEditorContent(content);
      }}
        style={{ height: '90%', fontSize: '14px', fontStyle: 'poppin' }}
        className={`max-lg:h-full editor-content  ${isDisabled ? 'pointer-events-none opacity-50' : ''}`}
      />
    </div>
  );
}