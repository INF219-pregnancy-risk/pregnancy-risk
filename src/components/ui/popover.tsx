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
import React from "react";

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
  const [hovering, setHovering] = React.useState(false);

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
            initial={{ opacity: 0, y: -20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            className="overflow-hidden shadow-lg border-2 min-w-[250px] min-h-[75px] z-50 top-10 -right-125s translate-y-full flex flex-col justify-center bg-popover rounded-md p-2 absolute"
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
