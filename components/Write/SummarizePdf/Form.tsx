// components/Write/SummarizePdf/Form.tsx
"use client";

import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Document, Page, pdfjs } from 'react-pdf';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { SimpleDropdown } from '../SimpleDropdown';
import { generateContent } from '@/actions/write/action';
import { DownLoadDialog } from '../DownloadDialog';
import { VideoCondenseProgress } from '@/components/Video/VideoCondense';
import FormError from '@/components/form-error';
import CustomDropzone from '@/components/Video/Custom-dropzone';
import { acceptedPdfFiles } from '@/utils/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const schema = z.object({
  language: z.string(),
});

type FormFields = z.infer<typeof schema>;


const PdfSummarizer = () => {
  const [parsedText, setParsedText] = useState<string>('');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null); // State for error message

  // Function to parse the PDF file
 // Function to parse the PDF file
const parsePdfFile = async (uploadedFile: File) => {
  setProgress(0);
  setLoadedPages(0); // Reset loaded pages
  setError(null); // Reset error state

  const fileReader = new FileReader();
  setDisabled(true)
  fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      let textContent = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const content = await page.getTextContent();
        const textItems = content.items.map((item) => {
            if ('str' in item) {
                return item.str; 
            }
            return '';
        });
        
        textContent += textItems.join(' ') + ' '; // Concatenate text from each page
    }

      setParsedText(textContent); // Store parsed text in state
      setDisabled(false)
  };

  fileReader.readAsArrayBuffer(uploadedFile);
};

 



  

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setProgress(0); // Reset progress for page loading
    setLoadedPages(0); // Reset loaded pages count
  };
  // Handle file upload from CustomDropzone
  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    parsePdfFile(uploadedFile); // Parse the PDF file
  };
  const handleLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const loadProgress = (loaded / total) * 100; // Calculate the percentage of the loaded document
    setProgress(loadProgress); // Update the progress state
  };

  const handleLoadError = (error: Error) => {
    const errorMessage = error.message || "Failed to load the document. Please check the file and try again.";
    setError(errorMessage);
  };

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { isSubmitting } } = methods;

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const content = await generateContent("pdf_summarizer", {
        language: values.language, 
        topic: parsedText,
      });

      setGeneratedText(content); 
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const data = [
    { title: "English", value: "english" },
    { title: "Spanish", value: "spanish" },
    { title: "French", value: "french" },
    { title: "German", value: "german" },
    { title: "Italian", value: "italian" },
    { title: "Portuguese", value: "portuguese" },
    { title: "Chinese (Simplified)", value: "chinese_simplified" },
    { title: "Chinese (Traditional)", value: "chinese_traditional" },
    { title: "Japanese", value: "japanese" },
    { title: "Korean", value: "korean" },
    { title: "Russian", value: "russian" },
    { title: "Arabic", value: "arabic" },
    { title: "Hindi", value: "hindi" },
    { title: "Bengali", value: "bengali" },
    { title: "Turkish", value: "turkish" },
    { title: "Vietnamese", value: "vietnamese" },
    { title: "Thai", value: "thai" },
    { title: "Dutch", value: "dutch" },
    { title: "Swedish", value: "swedish" },
    { title: "Norwegian", value: "norwegian" },
    { title: "Danish", value: "danish" },
    { title: "Finnish", value: "finnish" },
    { title: "Greek", value: "greek" },
    { title: "Hebrew", value: "hebrew" },
    { title: "Indonesian", value: "indonesian" },
    { title: "Malay", value: "malay" },
    { title: "Filipino", value: "filipino" },
    { title: "Swahili", value: "swahili" },
    { title: "Ukrainian", value: "ukrainian" },
    { title: "Czech", value: "czech" },
    { title: "Hungarian", value: "hungarian" },
    { title: "Romanian", value: "romanian" },
    { title: "Slovak", value: "slovak" },
    { title: "Bulgarian", value: "bulgarian" },
    { title: "Serbian", value: "serbian" },
    { title: "Croatian", value: "croatian" },
    { title: "Slovenian", value: "slovenian" },
    { title: "Latvian", value: "latvian" },
    { title: "Lithuanian", value: "lithuanian" },
    { title: "Estonian", value: "estonian" },
    { title: "Icelandic", value: "icelandic" },
    { title: "Maltese", value: "maltese" },
    { title: "Basque", value: "basque" },
    { title: "Catalan", value: "catalan" },
    { title: "Galician", value: "galician" },
  ];

  return (
    <>
      {generatedText ? (
        <Card className='w-full max-w-[940px] shadow-2xl border-none m-auto p-6'>
          <CardContent className='h-[400px] overflow-auto text-paragraph font-poppin text-[0.89rem] p-6 rounded-md'> 
            {generatedText}
          </CardContent> 
          <CardFooter className='w-full flex justify-center items-center flex-col pt-2'>
            <p className='text-center font-poppin cursor-pointer underline text-paragraph text-md' onClick={() => setGeneratedText("")}>Keep Editing</p>
            <div className='max-w-sm space-y-2 flex items-end gap-3 '>
              <DownLoadDialog generatedText={generatedText} fileName="pdf-summarizer"/>
              <Button size="lg" onClick={() => {
                setFile(null); // Reset the file state
                setParsedText(''); // Clear parsed text
                setGeneratedText(''); // Clear generated text
              }}>Start Over</Button>
            </div>
          </CardFooter> 
        </Card>
      ) : (
        <Card className='w-full max-w-[940px] shadow-2xl border-none m-auto'>
          {!file && (
           <CustomDropzone 
           handleUpload={handleUpload} 
           acceptedFile={acceptedPdfFiles} // Accept only PDF files
         />
          )}

          <div className="px-4 py-8 h-full relative flex flex-col">
            {file && (
              <div className="overflow-y-auto flex-grow h-[450px]">
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px]">
                      <VideoCondenseProgress progress={progress}/>
                    </div>
                  }
                  error={
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px]">
                  <FormError message={error ||""}/>
                  </div>
                  }
                  onLoadProgress={handleLoadProgress}
                  onLoadError={handleLoadError} // Add this line to handle load errors
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="flex flex-col text-center w-[220px]">
                      <Card className="w-full h-max overflow-hidden border">
                        <Page
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={220} 
                          loading={
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px]">
                              <VideoCondenseProgress progress={progress}/>
                            </div>
                          }
                        />
                      </Card>
                      <p className='text-center font-poppin text-paragraph text-[0.8rem] w-full'>{index + 1}</p>
                    </div>
                  ))} 
                </Document>
              </div>
            )}

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-0 left-0 right-0">
                <Card className="gap-2 flex justify-center items-center w-full">
                  <CardContent className="flex justify-center gap-2 w-full items-end pt-4">
                    <div className="w-full max-w-sm">
                      <SimpleDropdown name="language" control={control} label="Language" data={data} />
                    </div>
                    <Button type="submit" disabled={isSubmitting || disabled}>
                      {isSubmitting ? 'Summarizing...' : 'Summarize'}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </FormProvider>
          </div>
        </Card>
      )}
    </>
  );
};

export default PdfSummarizer;
