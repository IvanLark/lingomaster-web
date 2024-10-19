import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

interface AccordionItemProps {
  title: string;
  content: (string | JSX.Element)[]|JSX.Element;
}

export default function AccordionItem({title, content}: AccordionItemProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        style={{ borderBottom: '1px solid #e5e5e5' }}>
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
    </Accordion>
  );
}