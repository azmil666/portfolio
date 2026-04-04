import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "../lib/utils";

export const LinkPreview = ({ children, url }) => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) {
  return children;
}
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
          className="shadow-xl rounded-xl"
          style={{ x: translateX }}
        >
          <img
            src={src}
            width={200}
            height={125}
            className="rounded-lg border border-neutral-800"
          />
        </motion.div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};