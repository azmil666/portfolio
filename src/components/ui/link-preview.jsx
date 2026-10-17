import React, { useState } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

export const LinkPreview = ({
  children,
  url,
  imageSrc,
  isStatic = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = (event.clientX - rect.left - rect.width / 2) / 3;
    x.set(offset);
  };

  return (
    <HoverCardPrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      openDelay={100}
      closeDelay={150}
    >
      <HoverCardPrimitive.Trigger asChild>
        <div
          className="w-full inline-block cursor-pointer"
          onMouseMove={handleMouseMove}
        >
          {children}
        </div>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal forceMount>
        <AnimatePresence>
          {isOpen && imageSrc && (
            <HoverCardPrimitive.Content
              side="top"
              align="center"
              sideOffset={16}
              collisionPadding={20}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1], 
                }}
                style={{ x: springX }}
                className="z-[99999] outline-none"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-1 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-md overflow-hidden"
                >
                  <div className="project-preview-frame rounded-lg overflow-hidden">
                    <img
                      src={imageSrc}
                      alt="Website preview"
                      draggable="false"
                      className="project-preview-image object-cover max-w-[250px] rounded-md transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </a>
              </motion.div>
            </HoverCardPrimitive.Content>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};