import {
  Instagram,
  Scan,
  Search,
  ArrowLeft,
  ArrowRight,
  Volume2,
  CircleUser,
  Video,
  VolumeOff,
  FileText,
  File,
  GitMerge,
  Lock,
  LockOpen,
  PenLine,
  RefreshCcw,
  Scissors,
} from "lucide-react";

import Triangle from "./LeftTriangle.svg";
import RightSide from "./RightSide.svg";
// import Logo from "./NifaWowLogo.svg";
import VertivalTriangle from "./VerticalTriangle.svg";
import Square from "./Square.svg";
import LeftSingleTriangle from "./LeftSingleTriangle.svg";
import NavBarLogo from "./NavBarLogo.svg";
// import LightNifaWow from "./logo-light.svg";
import QRcodeImage from "./QRCode.svg"
import Linkedin from "./linkedin.svg"
import Facebook from "./facebook.svg"
import Tumblr from "./tumblr.svg"
import Twitter from "./twitter.svg"
import Google from "./google.svg"
import Pinterest from "./pinterest.svg"


const ImageIcon = ({ color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-image"
  >
    <rect width="18" height="18" x="3" y="3" rx="4" ry="4" />{" "}
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);
const StarIcon = ()=>(
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.82819 2.13275L10.1988 4.87082C10.3331 5.13962 10.5923 5.32601 10.893 5.36914L13.959 5.81046C14.7165 5.91983 15.018 6.83791 14.4697 7.36396L12.2526 9.49433C12.0348 9.70382 11.9356 10.005 11.9871 10.3007L12.5103 13.3084C12.6392 14.0524 11.8473 14.62 11.1702 14.268L8.42991 12.847C8.16127 12.7076 7.83952 12.7076 7.57009 12.847L4.82975 14.268C4.15267 14.62 3.3608 14.0524 3.49043 13.3084L4.01288 10.3007C4.06443 10.005 3.96525 9.70382 3.74736 9.49433L1.53026 7.36396C0.982036 6.83791 1.28348 5.91983 2.041 5.81046L5.10699 5.36914C5.40765 5.32601 5.66771 5.13962 5.80203 4.87082L7.17181 2.13275C7.51074 1.45575 8.48926 1.45575 8.82819 2.13275Z" stroke="#A7A9AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
)
const Drive =()=>(
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#1A8FE3" viewBox="0 0 512 512">
    <path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"/>
    </svg>
)

const newTabLink=()=>(
  <svg width="12" height="12">
      <use xlinkHref="https://NifaWow.com/v3/img/svg-sprite.svg#link-arrow" />
    </svg>
)


 const mailIcon=()=>(
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail">
    <rect width="20" height="16" x="2" y="4" rx="10"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
</svg>
)

export {
  FileText,
  Search,Linkedin,Pinterest,Twitter,Tumblr,Facebook,
  ArrowLeft,
  ArrowRight,
  Triangle,
  RightSide,
 
  VertivalTriangle,
  Square,
  LeftSingleTriangle,
  NavBarLogo,
  // LightNifaWow,
  ImageIcon,
  Instagram,
  Scan,
  Volume2,
  CircleUser,
  Video,
  VolumeOff,
  File,
  GitMerge,
  Lock,
  LockOpen,
  PenLine,
  RefreshCcw,mailIcon,Google,
  Scissors,StarIcon,Drive,QRcodeImage,newTabLink
};
