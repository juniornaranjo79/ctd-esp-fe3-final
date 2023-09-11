import { useState } from 'react';
import { FaqsType, faqsData } from './data/faqsData';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

interface Props {
    faqs: FaqsType[]
}

export default function FaqsComponent( { faqs }: Props) {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = ( isExpanded: boolean, value: string ) => {
        setExpanded(isExpanded ? value : false);
    };

    return(
        <div>
            {faqs && faqs.map(( item ) => (
                <Box m={2} key={ item.id }>
                    <Accordion expanded= { expanded === item.id.toString() }  onChange={ (event, isExpanded) => handleChange(isExpanded, item.id.toString()) }>
                        <AccordionSummary expandIcon={ <ExpandMoreIcon color='primary' /> }>
                            <Typography>
                                { item.question }
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                { item.answer }
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>    
            ))}
        </div>
    )
}