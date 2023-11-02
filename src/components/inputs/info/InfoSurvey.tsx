import React from "react";
import HelpIcon from '@mui/icons-material/Help';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
export interface InfoSurveyProps {
    className?: string;
    content : string;
    }

const InfoSurvey = ({className, content }: InfoSurveyProps) => {
    return (
        <HoverCard>
        <HoverCardTrigger className="text-inherit cursor-pointer"><HelpIcon className="text-muted-foreground"/></HoverCardTrigger>
        <HoverCardContent>
          {content}
        </HoverCardContent>
      </HoverCard>
    )
}
export default InfoSurvey