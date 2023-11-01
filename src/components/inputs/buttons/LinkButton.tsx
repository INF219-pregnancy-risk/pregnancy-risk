"use client";
import React, { AnchorHTMLAttributes, ReactHTMLElement } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import SurveyButton, { SurveyButtonProps } from "./SurveyButton";

interface LinkButtonProps extends SurveyButtonProps {
  href: string;
}

const LinkButton = ({
  children,
  size = "default",
  href,
  variant = "ghost",
  className,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      <SurveyButton
        {...props}
        size={"min"}
        variant={"none"}
        tabIndex={-1}
        className={className}
      >
        {children}
      </SurveyButton>
    </Link>
  );
};

export default LinkButton;
