import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "../lib/utils";

export const LinkPreview = ({ children, url }) => {
  const isMobile = window.matchMedia("(hover: none)").matches;
  if (isMobile) return children;

  const [loaded, setLoaded] = useState(false);

  const src = `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url`;

  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = (event.clientX - rect.left - rect.width / 2) / 2;
    x.set(offset);
  };

  return (
    <HoverCardPrimitive.Root openDelay={150} closeDelay={100}>
      <HoverCardPrimitive.Trigger asChild>
  <div className="w-full" onMouseMove={handleMouseMove}>
    {children}
  </div>
</HoverCardPrimitive.Trigger>
     
      <HoverCardPrimitive.Content
  side="top"
  align="center"
  sideOffset={10}
  className="z-[999] "
>
       <motion.div
  initial={{ opacity: 0, y: 20, scale: 0.6 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  className="shadow-xl rounded-xl relative overflow-hidden"
  style={{ x: translateX }}
>

  
  {!loaded && (
  <div className="w-[200px] h-[125px] flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-400">
    Loading preview...
  </div>
)}

 
  <img
    src={src}
    width={200}
    height={125}
    onLoad={() => setLoaded(true)}
    className={`rounded-lg border border-neutral-800 transition-opacity duration-300 ${
      loaded ? "opacity-100" : "opacity-0"
    }`}
  />
</motion.div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};