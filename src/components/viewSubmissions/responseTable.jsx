import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ResponseTable({ responses = [], questionMap }) {

    return (
        <div className='response-table-container'>
            {responses.map((responseObj, index) => (
                <Accordion key={index} className='response-accordion' defaultExpanded={index === 0}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography component="span"><b>{responseObj.respondent_name}</b>(<i>{responseObj.respondent_id}</i>)</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {Object.entries(responseObj.response).map(([idx, response]) => {
                            return (
                                <div key={idx} style={{ marginBottom: '1em' }}>

                                    <p>
                                        <span className="response-accordion-que">Que: {questionMap[response.question_no]}</span><br />
                                        <span className="response-accordion-ans"><b><i>Ans:</i></b> {response.response}</span>
                                    </p>
                                </div>
                            );
                        })}
                        <Typography component="span" sx={{ color: 'gray', fontStyle: 'italic', float: 'right', marginRight: '16px', marginBottom: '10px' }}>
                            Submitted at: {new Date(responseObj.created_at).toLocaleString()}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}


        </div>
    )
}
