import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * Props for the AccordionResult component.
 */
export interface AccordionResultProps {
  /**
   * The header text for the accordion item.
   */
  header?: string;
  /**
   * The content to be displayed when the accordion item is expanded.
   */
  content?: React.ReactNode;
  /**
   * Additional class name(s) for styling the accordion item.
   */
  className?: string;
}

/**
 * A component that renders an accordion item with a header and content.
 */
const AccordationResult = ({
  header,
  content,
  className,
  ...props
}: AccordionResultProps) => {
  return (
    <Accordion type="single" collapsible {...props} className={cn(className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-center items-center justify-center">
          {header}
        </AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordationResult;
