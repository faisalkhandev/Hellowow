"use client";

import React, { useEffect } from 'react';
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import { Control, FieldValues, Path, Controller, useController } from "react-hook-form";

interface TextEditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  Label: string;
}



export default function TextEditorForm<T extends FieldValues>({
  control,
  name,
  Label,
}: TextEditorProps<T>) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: { container: '#toolbarForm' },
    },
    formats: ["header", "bold", "italic"],
  });

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        const text = quill.root.innerHTML; // Get the HTML content
        onChange(text); // Update the form state with editor content
      };

      quill.on('text-change', handleTextChange);

      return () => {
        quill.off('text-change', handleTextChange);
      };
    }
  }, [quill, onChange]);

  return (
    <div>
      <h1 className="text-paragraph font-poppin font-semibold text-sm mt-2">{Label}</h1>
      <div
        className="editor-container"
        style={{ width: '100%', height: '430px', maxHeight: '430px', borderRadius: "8px" }}
      >
        <div id="toolbarForm" className="flex mt-2 gap-2 w-full">
          <button className="ql-header" value="1">H1</button>
          <button className="ql-header" value="2">H2</button>
          <button className="ql-bold">B</button>
          <button className="ql-italic">I</button>
        </div>

        <Controller
          name={name}
          control={control}
          render={() => (
            <div 
              ref={quillRef} 
              style={{ height: '90%' }}
              className="max-lg:h-full"
            />
          )}
        />
      </div>
    </div>
  );
}