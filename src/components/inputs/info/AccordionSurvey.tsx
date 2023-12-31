/**
 * AccordionSurvey component.
 *
 * @component
 * @example
 * ```tsx
 * <AccordionSurvey why="This is important because..." className="my-accordion" />
 * ```
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";

export interface AccordionSurveyProps {
  why?: string;
  className?: string;
}

const AccordionSurvey = ({
  why,
  className,
  ...props
}: AccordionSurveyProps) => {
  return (
    <Accordion type="single" collapsible {...props} className={cn(className)}>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="text-center items-center justify-center">
          Why is this important?
        </AccordionTrigger>
        <AccordionContent>{why}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSurvey;
