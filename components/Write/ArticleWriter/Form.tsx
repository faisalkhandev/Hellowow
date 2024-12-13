"use client";

import { useState, useEffect } from "react";
import { generateArticle, generateIdeas } from "@/actions/write/action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DownLoadDialog } from '@/components/Write/DownloadDialog'
import Editor from '@/components/Write/TextEditor'
import {MenuIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BlogDialog } from "../BlogDialog";

interface BlogIdea {
  title: string;
  type: "ai" | "search";
}



export const Form = () => {
  const [generatedText, setGeneratedText] = useState<string | null>("");
  // const [topic, setTopic] = useState<string | null>("");
  const [topic, setTopicValue] = useState("");
  const [BlogTopic, setBlogTopic] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isIdeaLoading, setIsIdeaLoading] = useState(false);
  const [isBlogIdeaLoading, setIsBlogIdeaLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [blogIdeas, setBlogIdeas] = useState<{ aiTitles: BlogIdea[]; searchTitles: BlogIdea[] }>({ aiTitles: [], searchTitles: [] });
  const [showIdeasSection, setShowIdeasSection] = useState(false);
  const [showEditor, setShowEditor] = useState(false); // State to control editor visibility

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerateIdeas = async () => {
    if (!topic) return;

    setIsIdeaLoading(true);
    try {
      const { aiTitles, searchTitles } = await generateIdeas(topic);
      setBlogIdeas({ aiTitles, searchTitles });
      setShowIdeasSection(true);
      setShowEditor(false); // Hide editor when showing ideas
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate ideas");
    } finally {
      setIsIdeaLoading(false);
    }
  };

  const handleGenerateFullArticle = async () => {
    if (!topic) return;
console.log(topic);

    setIsLoading(true);
    try {
      const article = await generateArticle(topic);
      setBlogTopic(topic)
      setIsBlogIdeaLoading(true);
      setGeneratedText(article);
      setShowIdeasSection(false); // Hide ideas section
      setBlogIdeas({ aiTitles: [], searchTitles: [] }); // Clear ideas
      setShowEditor(true); // Show editor when article is generated
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate article");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGenerateFromIdeaArticle = async (title: string) => {
    setBlogTopic(topic)
      setIsBlogIdeaLoading(true);
      setSelectedTitle(title);
      try {
        const article = await generateArticle(title);
    
        setGeneratedText(article);
        setShowIdeasSection(false);
        setShowEditor(true); // Show editor when generating from idea
      } catch (error) {
        console.error("Error:", error);
        alert(error instanceof Error ? error.message : "Failed to generate article");
      } finally {
        setIsBlogIdeaLoading(false);
        setSelectedTitle(null);
      }
    };



  

  const handleNeedIdeas = () => {
    if (blogIdeas.aiTitles.length > 0 || blogIdeas.searchTitles.length > 0) {
      setShowIdeasSection(true);
      setShowEditor(false); // Hide editor when showing ideas
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
       <div className=' mt-8 w-full max-w-[900px] mx-auto max-container'>
      <Card className="w-full shadow-xl border-none mt-6 space-y-6 flex-col text-center justify-center items-center max-lg:px-4 min-h-[332px] py-8 ">
        <div>
          <h1 className="text-[1rem] sm:text-[24px] font-[600] font-poppin text-heading">
            Your Article Title
          </h1>
          <p className="font-poppin text-paragraph text-[1rem] font-[400]">
            Enter a Title Below
          </p>
        </div>
        <CardContent className="w-full flex flex-col justify-center space-y-6 items-center">
          <input
            type="text"
            placeholder="Enter a high-level topic i.e. finance, Instagram, etc."
            className={`border border-[#E3E3E4] text-[0.9rem] max-w-[600px] h-12 font-[500] text-paragraph dark:bg-input dark:text-white dark:bg-[#223749] focus:border-[#BFDEFF] focus:outline-none rounded-lg w-full px-3`}
            onChange={(e) => setTopicValue(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-[500px]">
            <Button
              className="w-full h-14"
              onClick={handleGenerateIdeas}
              disabled={isLoading || !topic || isIdeaLoading ||isBlogIdeaLoading }
            >
              {isIdeaLoading ? (
                <div className="flex items-center gap-2">
                  Generating...
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Generate Ideas"
              )}
            </Button>
            <Button
              className="w-full h-14"
              onClick={handleGenerateFullArticle}
              disabled={isLoading || !topic || isIdeaLoading ||isBlogIdeaLoading }
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Generating...
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Generate Full Article"
              )}
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-400 inline mr-2">Don&apos;t have an idea?</p>
            <button
              className="text-blue-400 hover:text-blue-300"
              onClick={handleNeedIdeas}
            >
              Need Ideas?
            </button>
          </div>
        </CardContent>
      </Card>

      {showEditor && generatedText && (
        <div className='grid grid-cols-1  gap-6 mt-8 w-full '>
          <Card className=' max-lg:h-max h-[95vh] border-none shadow-2xl max-lg:p-1 p-3'>
            <CardHeader className='px-3 py-5'>
              <div className="flex justify-between items-center w-full">
                <h1 className='text-heading font-poppin text-[24px] font-[600] '>AI Generated Blog Post</h1>
                <div className='flex gap-10 items-center max-lg:hidden'>
                  <BlogDialog generatedText={generatedText}/>
                  <DownLoadDialog generatedText={generatedText} fileName={topic}/>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-lg:p-1">
              <div>
                <div className='flex gap-2 items-center border-t border-l border-r rounded-lg max-lg:-mb-3 max-lg:p-1 pt-4 px-3'>
                  {/* <MenuIcon size={16} className='mb-2' /> */}
                  <h1 className='text-heading font-poppin text-[1rem] font-[600] mb-2'>
                    {BlogTopic!.charAt(0).toUpperCase() + BlogTopic!.slice(1)}
                  </h1>
                </div>
                <Editor generatedText={generatedText}/>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showIdeasSection && blogIdeas && (
        <Card className=" py-4 md:py-8 my-8">
          <h2 className="text-3xl text-heading text-center mb-8 font-poppin font-[600]">Blog title ideas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Generated Titles */}
            <div className="rounded-lg p-4">
              <h3 className="text-xl text-heading-400 p-4 font-[600]">AI Generated Titles</h3>
              <div className="space-y-4">
                {blogIdeas.aiTitles.map((idea) => (
                  <div key={idea.title} className="flex flex-col  bg-[#F2F2F2] dark:bg-[#d3d3d334] rounded-lg p-2">
                    <h4 className="text-paragraph font-poppin ">{idea.title}</h4>
                    <Button
                        className="self-end my-2 disabled:opacity-50"
                        onClick={() => handleGenerateFromIdeaArticle(idea.title)}
                        disabled={isBlogIdeaLoading}
                      >
                        {selectedTitle === idea.title
                          ? "Generating..."
                          : "Generate"}
                      </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Generated Titles */}
            <div className="rounded-lg p-4">
              <h3 className="text-xl text-heading-400 font-[600] p-4">Search Generated Titles</h3>
              <div className="space-y-4">
                {blogIdeas.searchTitles.map((idea) => (
                  <div key={idea.title} className="flex flex-col my-2 bg-[#F2F2F2] dark:bg-[#d3d3d334] rounded-lg p-2">
                  <h4 className="text-paragraph">{idea.title}</h4>
                  <Button
                        className="self-end my-2 disabled:opacity-50"
                        onClick={() => handleGenerateFromIdeaArticle(idea.title)}
                        disabled={isBlogIdeaLoading}
                      >
                        {selectedTitle === idea.title
                          ? "Generating..."
                          : "Generate"}
                      </Button>
                </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

      )}
      </div>
    </>
  );
};
