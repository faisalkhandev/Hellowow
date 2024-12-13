import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

// Modify DialogDemo to accept props for controlling the dialog state and file info
export function WordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
    const [selectedLocationButton, setLocationButton] = useState("");
    const handleButtonClick = (buttonId:string) => {
        setLocationButton(buttonId);
      };
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] p-4">
        <DialogHeader>
          <DialogTitle className="text-[1.4rem] font-poppin text-heading font-[600] leading-[20px]">Choose Options</DialogTitle>
          <DialogDescription className="text-[0.9rem] font-poppin text-paragraph font-[400]   whitespace-pre-wrap">
          Several options that you can choose
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4  ">
          <Card className={`p-0 w-full h-full ${selectedLocationButton === 'maintainFormating'?' bg-[#F6FBFE] border border-primary':"border-none"} `}
              onClick={() => handleButtonClick('maintainFormating')}>
            <CardContent className="p-3" >
                <h1 className="text-[0.9rem] font-poppin text-heading font-[500] ">Maintain Formatting</h1>
                <p className="text-[0.8rem] font-poppin text-paragraph font-[400] whitespace-pre-wrap max-w-[29ch]">Conversion to Word document. Formatting will be maintained if possible</p>
            </CardContent>
          </Card>
         <Card  className={`p-0 w-full h-full ${selectedLocationButton === 'truePdfFormat'?' bg-[#F6FBFE] border border-primary':"border-none"} `}
           onClick={() => handleButtonClick('truePdfFormat')}>
            <CardContent className="p-3" >
            <h1 className="text-[0.85rem] font-poppin text-heading font-[500] leading-[20px] pb-2">If in true PDF format, we will extract the text. This is the best option if you just need the text from a document. Please try this before option 3 if you are unsure whether your document is a true PDF.</h1>
            <p className="text-[0.8rem] font-poppin text-paragraph font-[400] whitespace-pre-wrap max-w-[29ch]">If in true PDF format, we will extract the text. This is the best option if you just need the text from a document. Please try this before option 3 if you are unsure whether your document is a true PDF.</p>
            </CardContent>
          </Card>
          <Card className={`p-0 w-full h-full ${selectedLocationButton === 'scannedDocument'?' bg-[#F6FBFE] border border-primary':"border-none"} `}
           onClick={() => handleButtonClick('scannedDocument')}>
            <CardContent className="p-3"  >
            <h1 className="text-[0.85rem] font-poppin text-heading font-[500] leading-[20px] pb-2">If the PDF you are uploading is from a scanned document, we will extract the text using OCR. Formatting is not maintained</h1>
            <p className="text-[0.8rem] font-poppin text-paragraph font-[400] whitespace-pre-wrap max-w-[29ch]">If the PDF you are uploading is from a scanned document, we will extract the text using OCR. Formatting is not maintained</p>
            </CardContent>
          </Card>
          </div>
          <div className="text-center">
      <p className="text-[0.75rem] italic font-poppin text-paragraph">No matter your choice, it’s free and no sign up is required. Read More</p>
      </div>
        <DialogFooter >
          <Button type="submit" onClick={handleDialogClose} className="w-full">
         Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
