"use client";
import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";
import { Button, Sizes } from "@/components/ui/button";
import SurveyButton from "./SurveyButton";

interface LinkButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  loading?: boolean;
  size?: sizes;
  disabled?: boolean;
  className?: string;
  href: string;
}

type sizes = "small" | "medium" | "large";

const BUTTON_STYLES = {
  small: {
    height: "30px",
    width: "100px",
    fontSize: "0.75rem",
    borderRadius: "5px",
  },
  medium: {
    height: "40px",
    width: "120px",
    fontSize: "1rem",
    borderRadius: "5px",
  },
  large: {
    height: "50px",
    width: "150px",
    fontSize: "1.25rem",
    borderRadius: "5px",
  },
};

const getButtonStyle = (size: sizes, disabled: boolean, className?: string) => {
  return {
    ...BUTTON_STYLES[size],
    color: "#fff",
    cursor: "pointer",
    ...(disabled && {
      opacity: 0.2,
      filter: "grayscale(1)",
      cursor: "default",
      PointerEvents: "none",
      color: "#000",
    }),
    ...(!className?.includes("bg-") && { backgroundColor: "#4b93e5" }),
  };
};

const LinkButton = ({
  loading = false,
  size = "medium",
  disabled = false,
  className = "",
  children,
  onClick,
  ...props
}: LinkButtonProps) => {
  return <Link {...props}>{children}</Link>;
};

export default LinkButton;
