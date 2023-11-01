import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionProps,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import React from 'react'

export interface AccordionSurveyProps {
    why?: string;
    className?: string;
}

const AccordionSurvey = ({why, ...props}: AccordionSurveyProps) => {
  return (
  <Accordion type="single" collapsible {...props} className="">
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-center items-center justify-center" >Why is this important?</AccordionTrigger>
    <AccordionContent>
      {why}
    </AccordionContent>
  </AccordionItem>
</Accordion> 
   
  ) 
}

export default AccordionSurvey