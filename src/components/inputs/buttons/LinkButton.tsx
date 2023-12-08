/**
 * A button component that serves as a link.
 *
 * @component
 * @example
 * ```tsx
 * import LinkButton from "./LinkButton";
 *
 * const MyComponent = () => {
 *   return (
 *     <LinkButton href="/home" variant="primary">
 *       Go to Home
 *     </LinkButton>
 *   );
 * };
 * ```
 */
"use client";

import SurveyButton, { SurveyButtonProps } from "./SurveyButton";
import { Sizes, Variant, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React from "react";

export interface LinkButtonProps extends SurveyButtonProps, LinkProps {
  children?: React.ReactNode;
  size?: Sizes;
  variant?: Variant;
  className?: string;
}

const LinkButton = ({
  children,
  size = "default",
  variant = "ghost",
  className,
  checked,
  loading,
  icon,
  href,
  iconPosition = "left",
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      {...props}
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      <SurveyButton
        tabIndex={-1}
        {...{ size, checked, loading, icon, iconPosition }}
        variant={"none"}
        size={"min"}
        className={cn(
          className,
          "ring-0 outline-0 border-0 border-transparent ring-transparent outline-transparent bg-transparent"
        )}
      >
        {children}
      </SurveyButton>
    </Link>
  );
};

export default LinkButton;
