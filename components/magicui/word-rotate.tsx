"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  framerPropsDiv?: HTMLMotionProps<"div">;

  className?: string;
}
const bgColorMap: { [key: string]: string } = {
  "Education": "#FF6B6B",
  "Everything": "#4ECDC4",
  "Your Life": "#45B7D1",
  "Business": "#F7B731"
};
export default function WordRotate({
  words,
  duration =4000,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState(bgColorMap[words[0]] || "#000000");


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % words.length;
        setBgColor(bgColorMap[words[newIndex]] || "#000000");
        return newIndex;
      });

    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <motion.div className="overflow-hidden max-w-content"
    >
      <AnimatePresence mode="wait">
        <motion.div    
        className="transition-colors duration-500 p-1  w-max-content" style={{ backgroundColor: bgColor }}>
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </motion.h1>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
