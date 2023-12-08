/**
 * SurveyButton component.
 *
 * @component
 * @example
 * ```tsx
 * import SurveyButton from "@/components/inputs/buttons/SurveyButton";
 *
 * const MyComponent = () => {
 *   return <SurveyButton>Click me</SurveyButton>;
 * };
 * ```
 */
"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CheckIcon from "@mui/icons-material/Check";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export interface SurveyButtonProps {
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

interface Props extends SurveyButtonProps, ButtonProps {}

const SurveyButton = ({
  checked = false,
  loading = false,
  disabled = false,
  className,
  icon = null,
  iconPosition = "left",
  children,
  ...props
}: Props) => {
  const _className = cn(className, "relative");
  return (
    <Button
      disabled={disabled}
      {...props}
      className={cn(
        "w-min",
        _className,
        disabled && "grayscale",
        props.size === "lg" && icon && "px-4"
      )}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 1,
              rotate: "60deg",
              translateX: "50%",
              translateY: "-50%",
            }}
            animate={{ scale: 1, opacity: 1, rotate: "0deg" }}
            exit={{ scale: 0, opacity: 0, rotate: "-60deg" }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
            className={cn(
              `absolute z-10 rounded-full bg-success text-success-foreground justify-center items-center flex overflow-hidden top-0 right-0 h-[50%] aspect-square`
            )}
          >
            <CheckIcon style={{ height: "100%", width: "100%" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div
          className="h-6 w-6 aspect-square border-t-current border-foreground/10 rounded-full absolute animate-spin"
          style={{
            borderWidth: "0.4vh",
          }}
        />
      )}

      <div
        className={cn(
          "flex items-center h-full",
          loading && "invisible",
          icon && children && "gap-2 grid grid-cols-[2fr_auto_1fr]"
        )}
      >
        <span
          id="icon"
          className={cn(
            "col-span-1 row-start-1",
            iconPosition === "left" ? "col-start-1" : "col-start-3"
          )}
        >
          {icon ? icon : null}
        </span>
        <span
          id="text"
          className="col-start-2 col-span-1 row-span-1 row-start-1 text-inherit"
        >
          {children}
        </span>
      </div>
    </Button>
  );
};

export default SurveyButton;
