import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionProps,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { cn } from "@/lib/utils";
  import React from "react";
  
  export interface AccordionResultProps {
    header?: string;
    content?: React.ReactNode;
    className?: string;
  }
  
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