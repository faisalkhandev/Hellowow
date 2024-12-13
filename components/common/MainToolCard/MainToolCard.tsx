import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface MainToolCardProps {
  title: string;
  description: string;
  paragraph: string;
  divColor: string;
  iconColor: string;
  icon: React.ElementType;
  isdescription: boolean;
  isnewTabOpen: boolean;
  linkUrl?: string;
}

const MainToolCard: React.FC<MainToolCardProps> = ({
  title,
  description,
  paragraph,
  divColor,
  iconColor,
  icon: Icon,
  isdescription,
  isnewTabOpen = false,
  linkUrl,
}) => {
  return (
    <Card className="w-full rounded-xl border-none shadow-none max-w-[300ch] cursor-pointer h-full">
      <CardContent className="p-3 space-y-3">
        <div className="flex flex-col sm:flex-row justify-start gap-3 relative">
          <div
            className="rounded-lg w-[3rem] h-[3rem] flex justify-center items-center"
            style={{ backgroundColor: divColor }}
          >
            <Icon size={24} color={iconColor} strokeWidth={2} />
          </div>
          {isnewTabOpen && linkUrl ? (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              <div className="p-1 absolute right-0 md:top-6 border border-[#E3E3E4] rounded-sm cursor-pointer">
                <ExternalLink size={14} color="#707375" />
              </div>
            </a>
          ) : null}
          <div className="flex flex-col justify-start items-start text-start gap-1">
            <h1 className="font-poppin text-[0.9rem] sm:text-[1.05rem] font-[600] text-heading lg:whitespace-nowrap overflow-ellipsis overflow-hidden md:max-w-[15ch]">
              {title}
            </h1>
            <p
              className="text-[0.8rem] font-poppin font-[400]"
              style={{ color: iconColor }}
            >
              {description}
            </p>
          </div>
        </div>
        {isdescription ? (
          <CardDescription className="text-[#707375] text-[0.9rem] font-poppin whitespace-pre-wrap font-[400] max-w-[25ch] text-start max-lg:hidden">
            {paragraph}
          </CardDescription>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default MainToolCard;
