"use client"
import Image from "next/image";
import { navigateLinks, toolsLinks } from "@/constants/Footer/Items";
import LightNifaWow from "@/public/icons/Svgs/LightNifaWow.svg";
import DarkNifaWow from "@/public/icons/Svgs/DarkNifaWow.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
 const path=usePathname();
if(path == '/intellihub/ai-chat')return null;
  return (
    <section className="py-9 padding-x">
      <footer className="max-container dark:text-white">
        <div className="flex justify-between items-start flex-wrap flex-col lg:flex-row gap-6 lg:gap-14">
          <div className="flex flex-col justify-start items-start gap-2 cursor-pointer dark:pt-6">
            <Link href="/">
              <div className="h-[60px] w-[120px] mb-4">
                <Image
                  src={DarkNifaWow}
                  alt="Logo"
                  priority
                  width={120}
                  height={120}
                  className="object-contain dark:hidden"
                />
                <Image
                  src={LightNifaWow}
                  alt="Logo"
                  priority
                  width={120}
                  height={120}
                  className="object-contain hidden dark:block"
                />
              </div>
            </Link>
            <p className="font-poppin text-paragraph max-w-[40ch] text-sm">
              NifaWow provides free online conversion, pdf, and other handy
              tools to help you solve problems of all types. All files both
              processed and unprocessed are deleted after 1 hour.
            </p>
          </div>
          <div>
            {navigateLinks.map((footerLink, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-poppin font-[600] text-md leading-normal text-lg text-paragraph">
                  {footerLink.title}
                </h3>
                <div className="columns-1 mt-3 space-y-3">
                  {footerLink.links.map((link, index) => (
                    <li key={index} className="list-none">
                      <Link
                        href={link.link}
                        className="text-paragraph font-poppin font-[400] text-sm leading-normal cursor-pointer hover:text-[#309AE6]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1">
            {toolsLinks.map((footerLink, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-poppin font-[600] text-md leading-normal text-lg text-paragraph">
                  {footerLink.title}
                </h3>
                <div className="columns-2 sm:columns-3 lg:columns-4 mt-3 space-y-3">
                  {footerLink.links.map((link, index) => (
                    <li key={index} className="list-none max-w-[15ch]">
                      <Link
                        href={link.link}
                        className="font-poppin text-sm font-[400] leading-normal text-paragraph cursor-pointer hover:text-[#309AE6]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Footer;