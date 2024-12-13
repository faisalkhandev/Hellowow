"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { DialogDemo } from './KeepWritingDialog';
import TooltipButton from '../common/TooltipButton';
import { continueWriting, rewriteContent } from '@/actions/write/action';
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
  const [rewriteloading, setrewriteLoading] = useState(false);
  const [selectedLocationButton, setLocationButton] = useState("cursorLocation");
  const [selectSentencesButton, setSentencesButton] = useState("");
  const [editorContent, setEditorContent] = useState<string | null>(generatedText);

  useEffect(() => {
    setEditorContent(generatedText);
  }, [generatedText]);

  const handleRewrite = async () => {
    setLoading(true);
    setrewriteLoading(true);
    try {
      const rewrittenContent = await rewriteContent(editorContent || "");
      setEditorContent(rewrittenContent);
    } catch (error) {
      console.error("Error rewriting content:", error);
    } finally {
      setLoading(false);
      setrewriteLoading(false);


    }
  };

  const handleContinueWriting = async () => {
    setLoading(true);
    try {
      const continuation = await continueWriting(editorContent || "", selectSentencesButton);
      if (selectedLocationButton === 'cursorLocation' || selectedLocationButton === 'endOfCopy1') {
        setEditorContent((prevContent) => (prevContent || "") + "<br/><br/>" + continuation);
      }
    } catch (error) {
      console.error("Error continuing writing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogSubmit = (location: string, sentence: string) => {
    setLocationButton(location);
    setSentencesButton(sentence);
    handleContinueWriting();
  };

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
      <div id="toolbar" className="hidden lg:flex mt-2 gap-2 w-full">
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
        <TooltipButton tooltipContent="Rewrite">
          <button onClick={handleRewrite} style={{ width: "auto" }} className="ql-button hidden md:static" disabled={isDisabled}>
            {rewriteloading ? "Rewriting..." : "Rewrite"}
          </button>
        </TooltipButton>
        <DialogDemo onSubmit={handleDialogSubmit} isDisabled={isDisabled} />
      </div>

      <ReactQuill
        modules={modules}
        value={editorContent||""}
        onChange={(content: React.SetStateAction<string | null>) => {
          setEditorContent(content);
      }}
        style={{ height: '90%', fontSize: '14px', fontStyle: 'poppin' }}
        className={`max-lg:h-full editor-content  ${isDisabled ? 'pointer-events-none opacity-50' : ''}`}
      />
    </div>
  );
}


 






























// path/to/Editor.tsx

// import React, { useEffect, useState } from 'react';
// import 'quill/dist/quill.snow.css';
// import { DialogDemo } from './KeepWritingDialog';
// import TooltipButton from '../common/TooltipButton';
// import { continueWriting, rewriteContent } from '@/actions/write/action';
// import { BeatLoader } from "react-spinners";
// import { useTheme } from 'next-themes';
// import { useQuill } from "react-quilljs"; // Import the useQuill hook

// interface EditorProps {
//   generatedText: string | null;
// }

// export default function Editor({ generatedText }: EditorProps) {
//   const { quill, quillRef } = useQuill({
//     modules: {
//       toolbar: {
//         container: '#toolbar',
//       },
//     },
//     formats: ["header", "bold", "italic"],
//   });

//   const { theme } = useTheme();
//   const [loading, setLoading] = useState(false);
//   const [rewriteloading, setrewriteLoading] = useState(false);
//   const [selectedLocationButton, setLocationButton] = useState("cursorLocation");
//   const [selectSentencesButton, setSentencesButton] = useState("");

//   useEffect(() => {
//     if (quill) {
//       quill.setText(generatedText || ""); // Set initial content
//     }
//   }, [generatedText, quill]);

//   const handleRewrite = async () => {
//     if (!quill) return; // Check if quill is defined
//     setLoading(true);
//     setrewriteLoading(true);
//     try {
//       const rewrittenContent = await rewriteContent(quill.getText() || "");
//       quill.setText(rewrittenContent);
//     } catch (error) {
//       console.error("Error rewriting content:", error);
//     } finally {
//       setLoading(false);
//       setrewriteLoading(false);
//     }
//   };

//   const handleContinueWriting = async () => {
//     if (!quill) return; // Check if quill is defined
//     setLoading(true);
//     try {
//       const continuation = await continueWriting(quill.getText() || "", selectSentencesButton);
//       if (selectedLocationButton === 'cursorLocation' || selectedLocationButton === 'endOfCopy1') {
//         quill.setText((quill.getText() || "") + "\n\n" + continuation);
//       }
//     } catch (error) {
//       console.error("Error continuing writing:", error);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   const handleDialogSubmit = (location: string, sentence: string) => {
//     setLocationButton(location);
//     setSentencesButton(sentence);
//     handleContinueWriting();
//   };

//   const isDisabled = !quill;

//   return (
//     <div className="editor-container invisible-scrollbar" style={{ width: '100%', height: '430px', maxHeight: '430px', borderRadius: "8px", position: 'relative' }}>
//       <style>{`
//         .ql-toolbar .ql-stroke {
//           fill: none !important;
//           stroke: #A2A4A5 !important;
//         }
//         .ql-toolbar .ql-fill {
//           fill: #A2A4A5 !important;
//           stroke: none !important;
//         }
//         .editor-content {
//           color: ${theme === 'dark' ? 'white' : '#707375'};
//         }
//       `}</style>

//       {loading && (
//         <div className='w-full h-full flex justify-center items-center absolute z-50'>
//           <BeatLoader color='#1A8FE3' margin='0' />
//         </div>
//       )}

//       {/* Custom Toolbar */}
//       <div id="toolbar" className="hidden lg:flex mt-2 gap-2 w-full">
//         <TooltipButton tooltipContent="Heading 1">
//           <button className="ql-header" value="1" disabled={isDisabled}>H1</button>
//         </TooltipButton>
//         <TooltipButton tooltipContent="Heading 2">
//           <button className="ql-header" value="2" disabled={isDisabled}>H2</button>
//         </TooltipButton>
//         <TooltipButton tooltipContent="Bold (CTRL+B)">
//           <button className="ql-bold" disabled={isDisabled}>B</button>
//         </TooltipButton>
//         <TooltipButton tooltipContent="Italic (CTRL+I)">
//           <button className="ql-italic" disabled={isDisabled}>I</button>
//         </TooltipButton>
//         <TooltipButton tooltipContent="Rewrite">
//           <button onClick={handleRewrite} style={{ width: "auto" }} className="ql-button hidden md:static" disabled={isDisabled}>
//             {rewriteloading ? "Rewriting..." : "Rewrite"}
//           </button>
//         </TooltipButton>
//         <DialogDemo onSubmit={handleDialogSubmit} isDisabled={isDisabled} />
//       </div>

//       <div ref={quillRef} style={{ height: '90%', backgroundColor: "#F1F1F1" }} className={`max-lg:h-full editor-content ${isDisabled ? 'pointer-events-none opacity-50' : ''}`} />
//     </div>
//   );
// }