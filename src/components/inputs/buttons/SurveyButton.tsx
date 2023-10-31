"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import CheckIcon from "@mui/icons-material/Check";
import { cn } from "@/lib/utils";

interface SurveyButtonProps extends ButtonProps {
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const SurveyButton = ({
  checked = false,
  loading = false,
  disabled = false,
  className,
  icon = null,
  children,
  ...props
}: SurveyButtonProps) => {
  const _className = cn(className, "relative");
  return (
    <Button
      disabled={disabled}
      {...props}
      className={cn(_className, disabled && "grayscale")}
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
      <div className="flex items-center justify-center h-full w-full relative">
        {loading && (
          <div
            className="h-2/3 aspect-square border-t-muted-foreground border-muted rounded-full absolute animate-spin"
            style={{
              borderWidth: "0.4vh",
            }}
          />
        )}
        <>
          <span
            className={cn(
              "flex justify-center items-center",
              loading && "invisible",
              icon && children && "gap-2 pr-4"
            )}
          >
            {icon ? icon : null}
            {children}
          </span>
        </>
      </div>
    </Button>
  );
};

export default SurveyButton;
