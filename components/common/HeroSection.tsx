"use client";
import React, { useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WordRotate from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RightSide, Search, Triangle } from "@/public/icons/Svgs";
import Image from "next/image";
import debounce from "lodash/debounce";

interface HeroSectionProps {
  title?: string;
  paragraph: string;
  ismainHeading?: boolean;
}

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("search") || ""
  );

  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (query) {
        newSearchParams.set("search", query);
      } else {
        newSearchParams.delete("search");
      }
      router.push(`?${newSearchParams.toString()}`);
    }, 300),
    [searchParams, router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearch.flush();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative shadow-xl rounded-full lg:mt-4"
    >
      <Input
        type="text"
        placeholder="Search"
        className="h-11 pl-14 pr-20 py-8 text-[1rem] border-none rounded-full bg-input"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Search
        className="absolute mr-4 left-3 top-1/2 transform -translate-y-1/2"
        size={26}
        color="#1A8FE3"
      />
      <Button
        type="submit"
        size="lg"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm rounded-full"
      >
        Search
      </Button>
    </form>
  );
};

const HeroSection = ({
  title,
  paragraph,
  ismainHeading = false,
}: HeroSectionProps) => {
  return (
    <div className="max-container relative">
      <Image
        src={RightSide}
        alt="square_box"
        width={100}
        className="lg:w-auto absolute right-0 sm:right-6"
      />
      <Image
        src={Triangle}
        alt="square_box"
        width={100}
        className=" lg:w-auto absolute left-2 -top-10"
      />
      <div className="flex flex-col justify-between items-start space-y-2 lg:space-y-5 sm:items-center">
        {ismainHeading ? (
          <>
            <h1 className="text-[1.6rem] sm:text-[56px] font-bold font-poppin text-heading flex flex-row items-center flex-wrap dark:text-white">
              Free Tools to Make
              <div className="pr-3 sm:px-4 w-[200px] sm:w-[360px]">
                <WordRotate
                  className="mx-2 text-white"
                  words={["Education", "Everything", "Your Life", "Business"]}
                />
              </div>
              Simple
            </h1>
            <p className="text-paragraph font-poppin mt-4 text-[1rem]">
              {paragraph}
            </p>
          </>
        ) : (
          <>
            <h1 className=" text-[1.4rem] sm:text-[60px] font-bold font-poppin text-heading flex flex-row items-center flex-wrap dark:text-white pt-4">
              {title}
            </h1>
            <p className="text-paragraph font-poppin mt-2 text-[0.8em] sm:text-[1rem]">
              {paragraph}
            </p>
          </>
        )}
        <div className="relative w-full max-w-xl">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchComponent />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
