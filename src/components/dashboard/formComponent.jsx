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
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function FormComponent({ form, handleDelete }) {
    const [open, setOpen] = useState(false);

    const handleShare = () => {
        const url = `${window.location.origin}/form/${form._id}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
        } else {
            // fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id={`panel3-header-${form._id}`}
                >
                    <Typography component="span" sx={{ flexGrow: 1 }}>
                        <b>{form.title} </b>
                    </Typography>
                    <Typography component="span" ><span className='form-list-total-sub'>Total Submissions: {form.total_responses}</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {form.description}
                    <Typography component="span" sx={{ color: 'gray', fontStyle: 'italic', float: 'right', marginRight: '16px' }}>
                        Created at: {new Date(form.created_at).toLocaleString()}
                    </Typography>
                </AccordionDetails>

                <AccordionActions sx={{ gap: 0, padding: '8px 16px' }}>
                    <Button
                        startIcon={<ShareIcon />}
                        title="Copy Link"
                        sx={{ minWidth: 0, padding: '6px 8px' }}
                        color="primary"
                        onClick={handleShare}
                    ></Button>
                    <Button
                        startIcon={<EditIcon />}
                        title="Edit Form"
                        sx={{ minWidth: 0, padding: '6px 8px' }}
                        color="secondary"
                    ></Button>
                    <Button
                        startIcon={<AssessmentIcon />}
                        title="View Analytics"
                        sx={{ minWidth: 0, padding: '6px 8px' }}
                        color='success'
                    ></Button>
                    <Button
                        startIcon={<AssignmentTurnedInIcon />}
                        title="View Submissions"
                        sx={{ minWidth: 0, padding: '6px 8px' }}
                        color='warning'
                        onClick={() => window.open(`/form/${form._id}/responses`, '_blank')}
                    ></Button>
                    <Button
                        startIcon={<DeleteIcon />}
                        title="Delete Form"
                        onClick={() => handleDelete(form._id)}
                        sx={{ minWidth: 0, padding: '6px 8px' }}
                        color='error'
                    ></Button>
                </AccordionActions>
            </Accordion>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert variant="filled" severity="info">Form link copied to share</Alert>
            </Snackbar>
        </div>
    );
}