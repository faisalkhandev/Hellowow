import { FileText, ImageIcon} from '@/public/icons/Svgs';  
import { File, GitMerge, Lock, LockOpen, PenLine, RefreshCcw, Scan, Scissors } from 'lucide-react';


export const pdfTools = [
  { id: 1, name: "Create PDF", link: "/pdf/create" },
  { id: 2, name: "PDF Translator", link: "/pdf/translate" },
  { id: 3, name: "PDF to JPG", link: "/pdf/to-jpg" },
  { id: 4, name: "eSign", link: "/pdf/sign" },
  { id: 5, name: "Compress PDF", link: "/pdf/compress" },
  { id: 6, name: "Protect", link: "/pdf/protect" },
  { id: 7, name: "Word to PDF", link: "/pdf/from-word" },
  { id: 8, name: "Rearrange", link: "/pdf/rearrange" },
  { id: 9, name: "Split", link: "/pdf/split" },
  { id: 10, name: "Extract Text", link: "/pdf/extract-text" },
  { id: 11, name: "Remove Password", link: "/pdf/unlock" },
  { id: 12, name: "All PDF Tools", link: "/tools/pdf" }
];



  export const featuredPdfTools = [
    { 
      id: 1, 
      name: "Edit PDF", 
      bgColor: "#E8F2FF", 
      iconColor: "#1A8FE3", 
      icon: FileText, 
      description: "Convert a PDF to Editor" ,
      link: "/pdf/edit"

    },
    { 
      id: 2, 
      name: "PDF to Word", 
      bgColor: "#FFF2E9", 
      iconColor: "#F5A142", 
      icon: FileText, 
      description: "Convert PDF to editable Word" ,
      link: "/pdf/to-word"

    },
    { 
      id: 3, 
      name: "JPG to PDF", 
      bgColor: "#E9F9EE", 
      iconColor: "#27AE60", 
      icon: FileText, 
      description: "Convert JPG images to PDF" ,
      link: "/pdf/from-jpg"
      

    },
    { 
      id: 4, 
      name: "Merge PDF", 
      bgColor: "#F2E8FF", 
      iconColor: "#9B51E0", 
      icon: FileText, 
      description: "Combine multiple PDFs into one" ,
      link: "/pdf/merge"

    }
  ];

  export const pdfPageTools = [
    {
      title: "Merge PDF",
      description: "Pdf Tools",
      paragraph: "Merge 2 or more PDF files into a single PDF file",
      icon: GitMerge , 
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/merge"
    },
    {
      title: "Edit PDF",
      description: "Pdf Tools",
      paragraph: "Free PDF Editor",
      icon: FileText,
      iconColor: "#10D0D5",
      divColor: "#E3FCFD",
      link: "/pdf/edit"
    },
    {
      title: "PDF to JPG",
      description: "Pdf Tools",
      paragraph: "Convert PDF to JPG and download each page as an image",
      icon: File, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/to-jpg"
    },
    {
      title: "JPG to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: FileText,
      iconColor: "#10D0D5",
      divColor: "#E3FCFD",
      link: "/pdf/from-jpg"

    },
    {
      title: "Compress PDF",
      description: "Pdf Tools",
      paragraph: "Lessen the file size of a PDF file",
      icon: Scan, // Add the specific icon here
      iconColor: "#624BD8",
      divColor: "#E9E6F9",
      link: "/pdf/compress"

    },
    {
      title: "Change Background of Photo",
      description: "Image Tools",
      paragraph: "Change Background of Image",
      icon: ImageIcon, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/change-bg-photo"

    },
    {
      title: "Split PDF",
      description: "Pdf Tools",
      paragraph: "Split into one or multiple PDF files",
      icon: Scissors, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/split"

    },
    {
      title: "PDF to Word",
      description: "Pdf Tools",
      paragraph: "Convert a PDF to Word Document",
      icon: FileText, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/to-word"

    },
    {
      title: "Word to PDF",
      description: "Pdf Tools",
      paragraph: "Convert a Word Document to PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#624BD8",
      divColor: "#E9E6F9",
      link: "/pdf/from-word"
    },
    {
      title: "Unlock PDF",
      description: "Pdf Tools",
      paragraph: "Remove the password from a PDF file (requires the password)",
      icon: LockOpen, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/unlock"

    },
    {
      title: "PDF to Excel",
      description: "Pdf Tools",
      paragraph: "Convert from PDF to XLSX",
      icon: FileText, // Add the specific icon here
      iconColor: "#79DC47",
      divColor: "#ECFAE5",
      link: "/pdf/to-xlsx"

    },
    {
      title: "PDF to Powerpoint",
      description: "Pdf Tools",
      paragraph: "Upload a PDF and Download as a PowerPoint Presentation",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/to-ppt"

    },
    {
      title: "PNG to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#10D0D5",
      divColor: "#E3FCFD",
      link: "/pdf/from-png"

    },
    {
      title: "EPUB to PDF",
      description: "Pdf Tools",
      paragraph: "Convert EPUB file to PDF file",
      icon: FileText, // Add the specific icon here
      iconColor: "#E24841",
      divColor: "#FBE6E5",
      link: "/pdf/from-epub"

    },
    {
      title: "Crop PDF",
      description: "Pdf Tools",
      paragraph: "Free PDF cropper",
      icon: FileText, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/crop"

    },
    {
      title: "Powerpoint to PDF",
      description: "Pdf Tools",
      paragraph: "Upload a Powerpoint presentation and Download as a PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#E24841",
      divColor: "#FBE6E5",
      link: "/pdf/from-ppt"

    },
    {
      title: "PDF to PNG",
      description: "Pdf Tools",
      paragraph: "Convert PDF to PNG and download each page as an image",
      icon: FileText, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/to-png"
    },
    {
      title: "PDF Translator",
      description: "Pdf Tools",
      paragraph: "Translate your PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#79DC47",
      divColor: "#ECFAE5",
      link: "/pdf/translate"

    },
    {
      title: "PDF Page Deleter",
      description: "Pdf Tools",
      paragraph: "Delete 1 or more pages from a PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/delete"

    },
    {
      title: "URL to PDF",
      description: "Pdf Tools",
      paragraph: "Enter a URL and receive the web page as a PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/from-url"

    },
    {
      title: "Rotate PDF",
      description: "Pdf Tools",
      paragraph: "Rotate one or more pages in a PDF file",
      icon: RefreshCcw, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/rotate"

    },
    {
      title: "Extract Images PDF",
      description: "Pdf Tools",
      paragraph: "Download the images from a PDF",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/extract-img"

    },
    {
      title: "Rearrange PDF",
      description: "Pdf Tools",
      paragraph: "Rearrange pages of PDF file",
      icon: FileText, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/rearrange"

    },
    {
      title: "Create PDF",
      description: "Pdf Tools",
      paragraph: "Free PDF Creator",
      icon: FileText, // Add the specific icon here
      iconColor: "#624BD8",
      divColor: "#E9E6F9",
      link: "/pdf/create"

    },
    {
      title: "PDF to EPUB",
      description: "Pdf Tools",
      paragraph: "Convert PDF file to EPUB file",
     icon: FileText,
      iconColor: "#10D0D5",
      divColor: "#E3FCFD",
      link: "/pdf/to-epub"

    },
    {
      title: "eSign PDF",
      description: "Pdf Tools",
      paragraph: "E-sign a PDF with a font or with your signature",
      icon: PenLine, // Add the specific icon here
      iconColor: "#FF7C1E",
      divColor: "#FFEDE0",
      link: "/pdf/sign"

    },
    {
      title: "Protect PDF",
      description: "Pdf Tools",
      paragraph: "Add a password to a PDF file",
      icon: Lock, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/protect"

    },
    {
      title: "PDF Watermark Remover",
      description: "Pdf Tools",
      paragraph: "Remove Watermark from PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/remove-watermark"

    },
    {
      title: "PDF to CSV",
      description: "Pdf Tools",
      paragraph: "Extract tables from PDF to CSV",
      icon: FileText, // Add the specific icon here
      iconColor: "#79DC47",
      divColor: "#ECFAE5",
      link: "/pdf/to-csv"

    },
    {
      title: "Add Numbers to PDF",
      description: "Pdf Tools",
      paragraph: "Add page numbers to a PDF file",
      icon: FileText, // Add the specific icon here
      iconColor: "#624BD8",
      divColor: "#E9E6F9",
      link: "/pdf/add-pages"

    },
    {
      title: "Add Watermark",
      description: "Pdf Tools",
      paragraph: "Stamp an image over your PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#FF7C1E",
      divColor: "#FFEDE0",
      link: "/pdf/watermark"

    },
    {
      title: "Images to PDF",
      description: "Pdf Tools",
      paragraph: "Add images to PDF online",
      icon: ImageIcon, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/from-png"

    },
    {
      title: "HEIC to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#FF7C1E",
      divColor: "#FFEDE0",
      link: "/pdf/from-heic"

    },
    {
      title: "Annotate PDF",
      description: "Pdf Tools",
      paragraph: "Free PDF Editor",
      icon: File, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/annotate"

    },
    {
      title: "TIFF to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/from-tiff"

    },
    {
      title: "Add Text",
      description: "Pdf Tools",
      paragraph: "Add Text to PDF",
      icon: FileText, // Add the specific icon here
      iconColor: "#FF7C1E",
      divColor: "#FFEDE0",
      link: "/pdf/add-text"
    },
    {
      title: "MOBI to PDF",
      description: "Pdf Tools",
      paragraph: "Convert MOBI file to PDF file",
      icon: Lock, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/from-mobi"

    },
    {
      title: "PDF to MOBI",
      description: "Pdf Tools",
      paragraph: "Convert PDF file to MOBI file",
      icon: Lock, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
      link: "/pdf/to-mobi"

    },
    {
      title: "PDF to TIFF",
      description: "Pdf Tools",
      paragraph: "Convert PDF to TIFF and download each page as an image",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
      link: "/pdf/to-tiff"

    },
    {
      title: "AZW3 to PDF",
      description: "Pdf Tools",
      paragraph: "Convert AZW3 file to PDF file",
      icon: FileText,
      iconColor: "#10D0D5",
      divColor: "#E3FCFD",
      link: "/pdf/to-azw3"

    },
    {
      title: "PDF to AZW3",
      description: "Pdf Tools",
      paragraph: "Convert PDF file to AZW3 file",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
       link: "/pdf/from-azw3"
    },
    {
      title: "PDF to Text",
      description: "Pdf Tools",
      paragraph: "Convert a PDF to Text",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
        link: "/pdf/to-text"
    },
    {
      title: "WEBP to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
        link: "/pdf/from-webp"
    },
    {
      title: "MS Outlook to PDF",
      description: "Pdf Tools",
      paragraph: "Upload a MS Outlook file and download as a PDF",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
       link: "/pdf/from-msg"
    },
    {
      title: "Extract text from PDF",
      description: "Pdf Tools",
      paragraph: "Extract text from PDF document",
      icon: File, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
       link: "/pdf/extract-text"
    },
    {
      title: "GIF to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: File, // Add the specific icon here
      iconColor: "#FF7919",
      divColor: "#FFEDE0",
        link: "/pdf/from-gif"
    },
    {
      title: "EPS to PDF",
      description: "Pdf Tools",
      paragraph: "Upload images and receive as a PDF",
      icon: File, // Add the specific icon here
      iconColor: "#E2C740",
      divColor: "#FEF9E2",
        link: "/pdf/from-eps"
    }
  ];
  
