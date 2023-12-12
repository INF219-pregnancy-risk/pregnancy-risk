/**
 * A popover component that displays additional content when hovered.
 *
 * @component
 * @example
 * // Usage
 * <Popover button={<button>Hover me</button>} title="Popover Title" description="Popover Description">
 *   <p>Popover Content</p>
 * </Popover>
 *
 * @param {React.ReactNode} button - The button that triggers the popover.
 * @param {string} [title] - The title of the popover.
 * @param {string} [description] - The description of the popover.
 * @param {React.ReactNode} children - The content to be displayed inside the popover.
 * @param {string} [className] - Additional CSS class name(s) for the popover container.
 * @returns {JSX.Element} The rendered Popover component.
 */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  button: React.ReactNode;
  title?: string;
  description?: string;
}

const Popover = ({
  button,
  title,
  description,
  children,
  className,
}: PopoverProps) => {
  const [hovering, setHovering] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null); // Create a ref for the popover

  // Function to check and update popover position
  const updatePopoverPosition = () => {
    if (popoverRef.current) {
      const popoverRect = popoverRef.current.getBoundingClientRect();
      let newStyle: React.CSSProperties = {};

      // Calculate available space in the viewport
      const availableWidth = window.innerWidth - popoverRect.left;
      const availableHeight = window.innerHeight - popoverRect.top;

      // Adjust width and height if popover goes out of the viewport
      if (popoverRect.right > window.innerWidth) {
        newStyle.width = `${availableWidth}px`;
        newStyle.right = "0px"; // Optional, adjust if you want to align to right
      }
      if (popoverRect.bottom > window.innerHeight) {
        newStyle.height = `${availableHeight}px`;
        newStyle.bottom = "0px"; // Optional, adjust if you want to align to bottom
      }

      // Update the style of the popover
      Object.assign(popoverRef.current.style, newStyle);
    }
  };

  useEffect(() => {
    // Update position when hovering state changes
    if (hovering) {
      updatePopoverPosition();
      console;
    }
  }, [hovering]);

  return (
    <div
      className={cn("flex items-center justify-center relative", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {button}
      <AnimatePresence>
        {hovering && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            onUpdate={updatePopoverPosition}
            className="overflow-auto shadow-lg border-2 min-w-[250px] min-h-[75px] z-50 top-10 -right-125 translate-y-full flex flex-col justify-center bg-popover rounded-md p-2 absolute"
          >
            {title && (
              <span className="text-sm font-bold mb-2 text-center">
                {title}
              </span>
            )}
            {description && (
              <i className="text-[10px] mb-2 text-gray-400">{description}</i>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popover;
