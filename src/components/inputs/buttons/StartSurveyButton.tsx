/**
 * StartSurveyButton component.
 *
 * This component renders a button that starts a survey. It handles the logic for checking if a survey has already been started and provides options to continue or start over.
 *
 * @component
 * @example
 * ```tsx
 * <StartSurveyButton onClick={handleStartSurvey} />
 * ```
 */
"use client";

import SurveyButton, { SurveyButtonProps } from "./SurveyButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSurveyUtil, resetSurveyUtil } from "@/utils/StoreSurvey";
import { ArrowForward } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

//with children

interface StartSurveyButtonProps extends SurveyButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const StartSurveyButton = ({
  children,
  onClick,
  ...props
}: StartSurveyButtonProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (status: boolean) => {
    setOpen(status);
  };

  const handleClick = () => {
    const storedSurvey = getSurveyUtil();
    if (pathname === "/survey") return;
    if (!storedSurvey.metadata.started) {
      onClick && onClick();
      router.push("/survey");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <SurveyButton
        {...props}
        onClick={(e) => {
          handleClick();
        }}
        icon={<ArrowForward />}
        iconPosition="right"
        disabled={pathname === "/survey"}
      >
        <span className="min-w-[85px] flex items-center justify-center">
          {children || pathname === "/survey" ? "At survey" : "Start survey"}
        </span>
      </SurveyButton>
      <Dialog onOpenChange={handleChange} open={open}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="">
            <DialogTitle>You already have started a survey</DialogTitle>
            <DialogDescription>
              Do you want to continue where you left off?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex w-full items-center gap-2 justify-center xs:flex-row xs:justify-start">
            <SurveyButton
              type="button"
              variant="secondary"
              className="w-full max-w-[150px]"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </SurveyButton>
            <SurveyButton
              variant={"destructive"}
              onClick={() => {
                resetSurveyUtil();
                onClick && onClick();
                router.push("/survey");
                setOpen(false);
              }}
              className="w-full max-w-[150px]"
            >
              Start over
            </SurveyButton>
            <SurveyButton
              onClick={() => {
                onClick && onClick();
                router.push("/survey");
                setOpen(false);
              }}
              className="w-full max-w-[150px]"
            >
              Continue
            </SurveyButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StartSurveyButton;
