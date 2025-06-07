import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function FormComponent({ form, handleDelete }) {
    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id={`panel3-header-${form._id}`}
                >
                    <Typography component="span" sx={{ flexGrow: 1 }}>
                        <b>{form.title} <i>(Form ID: {form._id})</i></b>
                    </Typography>
                    <Typography component="span"><i>Total Submissions: {form.total_responses}</i></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {form.description}
                    <Typography component="span" sx={{ color: 'gray', fontStyle: 'italic', float: 'right', marginRight: '16px' }}>

                        Created at: {new Date(form.created_at).toLocaleString()}
                    </Typography>
                </AccordionDetails>

                <AccordionActions>
                    <Button startIcon={<EditIcon />}>Edit</Button>
                    <Button startIcon={<AssessmentIcon />}>Analysis</Button>
                    <Button startIcon={<AssignmentTurnedInIcon />}>Submissions</Button>
                    <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDelete(form._id)}>Delete</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}