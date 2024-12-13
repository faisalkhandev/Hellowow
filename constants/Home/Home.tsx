import { FileText, Image,RefreshCcw,Pencil,LayoutGrid, GitMerge } from 'lucide-react';
import { Scan, Video, ImageIcon,File } from "@/public/icons/Svgs/index";


import profileImage from "@/public/images/Home/profile.webp";
import creator from  "@/public/images/Home/creator.webp";
import Pdfcreator from  "@/public/images/Home/Pdfcreator.webp";
import Pdfconvert from  "@/public/images/Home/Pdfconvert.webp";
import Removebg from  "@/public/images/Home/Removebg.webp";
import RemoveObj from  "@/public/images/Home/RemoveObj.webp";
import PdfEditor from  "@/public/images/Home/PdfEditor.webp";


export const sliderArray=  [
  {
    image: profileImage,
    divColor: "#E2EDFE",
    title: "Profile Photo Maker",
    description: "Style your Profile Photo For Social Media",
    link: "/image/profile-photo"
  },
  {
    image: creator, // Replace With Actual image
    divColor: "#E0FCFA",
    title: "Chart Creator",
    description: "Create Charts And download as an image",
    link: "/pdf/to-word"
  },
  {
    image: Pdfconvert, // Replace with actual image
    divColor: "#FDE1E1",
    title: "PDF to Word",
    description: "Create a Word Doc or Extract the text using OCR from a PDF",
    link: "/pdf/to-word"
  },
  {
    image: Pdfcreator, // Replace with actual image
    divColor: "#D8E6EF",
    title: "PDF Creator",
    description: "Create a PDF quickly and easily with our free PDF creator",
    link: "/pdf/create"
  },
  {
    image: Removebg, // Replace with actual image
    divColor: "#E2E3FE",
    title: "Background Remover",
    description: "Remove or change the background on a photo",
    link: "/image/remove-bg"
  },

  {
    image: PdfEditor, // Replace with actual image
    divColor: "#F9E1FD",
    title: "PDF Editor",
    description: "Edit an existing PDF and download with no sign-up required",
    link: "/pdf/edit"
  },
  {
    image: RemoveObj, // Replace with actual image
    divColor: "#E2FEE6",
    title: "Photo Cleanup",
    description: "Use AI to remove unwanted objects, items, people from an image",
    link: "/image/remove-objects"
  }
];


export const filtertool = [
    {
        id: 1,
        name: "WEBP to PDF",
        link:'/pdf/from-webp'
    },
    {
        id: 2,
        name: "WebP to JPG",
        link:'/image/from-webp'
    },
    {
        id: 3,
        name: "PDF to JPG",
        link:'/pdf/to-jpg'

    },
    {
        id: 4,
        name: "Edit PDF",
        link:'/pdf/edit'

    },
    {
        id: 5,
        name: "Create PDF",
        link:'/pdf/create'

    }
];

// ... other existing code ...

export const cardDataAI = [
  {
    id: 1,
    title: "Essay Writer",
    description: "AI write",
    paragraph: "Easily Create an Essay with AI",
    divColor: "#E9E6F9",
    iconColor: "#624BD8",
    icon: FileText,
     link: "/write/essay-writer"
  },
  {id:2,
      title: "Content Improver",
      description: "AI Write",
      paragraph: "Improve your content",
      divColor: "#E9F9EE", 
      iconColor: "#27AE60", 
      icon: FileText, 
    link: "/write/content-improver"
    },
  {
    id: 3,
    title: "Paragraph Writer",
    description: "AI Write",
    paragraph: "Paragraph Writer",
    divColor: "#E8F2FF", 
    iconColor: "#1A8FE3", 
    icon: FileText, 
    link: "/write/paragraph-writer"
  },
  {
    id: 4,
    title: "AI Image Generator",
    description: "Image Tools",
    paragraph: "AI Image Generator",
    icon: ImageIcon, // Add the specific icon here
    iconColor: "#FF7919",
    divColor: "#FFEDE0",
    link: "/ai-image-generator"
  },
  {
    id: 5,
    title: "Remove Background from Image",
    description: "Image Tools",
    paragraph: "Easily Remove the Background from an image",
    icon: ImageIcon,
    iconColor: "#10D0D5",
    divColor: "#E3FCFD",
    link: "/remove-background"
  },
  {
    id: 6,
    title: "Merge PDF",
    description: "Pdf Tools",
    paragraph: "Merge 2 or more PDF files into a single PDF file",
    icon: GitMerge , 
    iconColor: "#FF7919",
    divColor: "#FFEDE0",
    link: "/pdf/merge"
  },
  {
    id: 7,
    title: "Edit PDF",
    description: "Pdf Tools",
    paragraph: "Free PDF Editor",
    icon: FileText,
    iconColor: "#10D0D5",
    divColor: "#E3FCFD",
    link: "/pdf/edit"
  },
  {
    id: 8,
    title: "PDF to JPG",
      description: "Pdf Tools",
      paragraph: "Convert PDF to JPG and download each page as an image",
      icon: File, // Add the specific icon here
      iconColor: "#3D99F5",
      divColor: "#E2F0FE",
      link: "/pdf/to-jpg"
    },
  {
    id: 9,
    title: "JPG to PDF",
    description: "Pdf Tools",
    paragraph: "Upload images and receive as a PDF",
    icon: FileText,
    iconColor: "#27AE60",
    divColor: "#E9F9EE",
    link: "/pdf/from-jpg"
  },
   
  {
    id: 10,
    title: "Compress PDF",
    description: "Pdf Tools",
    paragraph: "Lessen the file size of a PDF file",
    icon: Scan, // Add the specific icon here
    iconColor: "#624BD8",
    divColor: "#E9E6F9",
    link: "/pdf/compress"
  },
  {
    id: 11,
    title: "Paragraph Completer",
    description: "AI Write",
    paragraph: "Paragraph Completer",
    divColor: "#E9F9EE", 
    iconColor: "#27AE60", 
    icon: FileText, 
    link: "/pdf/paragraph-completer"
  },
  {
    id: 12,
    title: "Upscale Image",
    description: "Image Tools",
    paragraph: "Increase the resolution of your image",
    icon: ImageIcon, // Add the specific icon here
    iconColor: "#E2C740",
    divColor: "#FEF9E2",
    link: "/pdf/upscale-image"
  },
];
export const TabBarArray = [
  {
    id: 1,
    title: "All Tools",
    link: "allTools",
    icon: LayoutGrid
  },
  {
    id: 2,
    title: "Pdf Tools",
    link: "pdfTools",
    icon: FileText
  },
  {
    id: 3,
    title: "Video Tools",
    link: "videoTools",
    icon: Video
  },
  {
    id: 4,
    title: "Image Tools",
    link: "imageTools",
    icon: Image
  },
  {
    id: 5,
    title: "Converter Tools",
    link: "converterTools",
    icon: RefreshCcw
  },
  {
    id: 6,
    title: "Other Tools",
    link: "otherTools",
    icon: LayoutGrid
  },
  {
    id: 7,
    title: "AI Write",
    link: "aiTools",
    icon: Pencil
  }
];

// ... rest of your existing code ...
export const cardData = [
    {
        id: 1,
        bgColor: "#6F56EC",
        iconBgColor: "#9D8CF2",
        icon: FileText,
        title: "PDF Tools",
        description: "Solve your PDF Problem",
        footerText: "PDF creator",
        footerDivColor: "#EFEDFD",
        darkDivColor:"#423D5C",
        link:"/pdf"
      },
  {
    id: 2,
    bgColor: "#F66213",
    iconBgColor: "#F8935F",
    icon: Image,
    title: "Image Tool",
    description: "Solve your Image Problem",
    footerText: "Remove BG",
    footerDivColor: "#FEF2EB",
    darkDivColor:"#5C483D",
    link:"/image"


  },

  {
    id: 3,
    bgColor: "#1C67CA",
    iconBgColor: "#6598DB",
    icon: FileText,
    title: "AI Write",
    description: "Solve your Image Problem",

    footerText: "Paragraph Writer",
    footerDivColor: "#EDF4FD",
    darkDivColor:"#3D4A5C",
    link:"/write"


  },
  {
    id: 4,
    bgColor: "#247881",
    iconBgColor: "#6AA3AA",
    icon: FileText,
    title: "File Tool",
    description: "Solve your Image Problem",

    footerText: "Split Excel",
    footerDivColor: "#EEF8FA",
    darkDivColor:"#3D595C",
    link:"/file"


  },
  {
    id: 5,
    bgColor: "#D61C4E",
    iconBgColor: "#E36587",
    icon: Video,
    title: "Video Tool",
    description: "Solve your Image Problem",

    footerText: "Mute Video",
    footerDivColor: "#FDEDF1",
    darkDivColor:"#65434C",
    link:"/video"


  },
];
export const statistics = [
    { value: "1m", label: "Active Users" },
    { value: "10m", label: "Files Converted" },
    { value: "200+", label: "Online Tools" },
    { value: "500k", label: "PDFs Created" }
  ];
