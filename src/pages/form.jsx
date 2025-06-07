import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createResponse, fetchForm } from '../api/respondentForm.api';
import FormCoverComponent from '../component.jsx/formCoverComponent';
import RespondentInformationComponent from '../component.jsx/respondentInformationComponent';
import QuestionComponent from '../component.jsx/questionComponent';
import { updateResponse } from '../api/respondentForm.api';
import FormFilledComponent from '../component.jsx/formFilledComponent';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function Form() {
    const { formId } = useParams();
    const [formData, setFormData] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [openRespondentInformation, setOpenRespondentInformation] = useState(false);
    const [formCompletionStatus, setFormCompletionStatus] = useState("incomplete");

    const [responseId, setResponseId] = useState("");
    const [questionObj, setQuestionObj] = useState(null);

    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' })

    const handleRespInfoSubmit = async (respondentName, respondentId) => {
        try {
            const responseData = await createResponse(formId, respondentName, respondentId);
            setResponseId(responseData.response_id);
            setQuestionObj(responseData.question);
            setFormCompletionStatus(responseData.response_status);

            if (responseData.response_status === "completed") {
                setToast({ open: true, message: 'You have already completed this form', severity: 'warning' });
            } else if (responseData.question.question_no !== 1) {
                setToast({ open: true, message: 'Starting from where you left', severity: 'info' });
            }
        } catch (error) {
            setToast({ open: true, message: 'Failed to submit respondent info.', severity: 'error' });
            console.error('Error submitting respondent info:', error);
        }
    }

    const handleQuestionSubmit = async (answer) => {
        if (responseId && questionObj) {
            try {
                const responseData = await updateResponse(responseId, questionObj.question_no, answer);
                setQuestionObj(responseData.question);
                setFormCompletionStatus(responseData.response_status);
                // setToast({ open: true, message: 'Answer submitted!', severity: 'success' });
            } catch (error) {
                setToast({ open: true, message: 'Failed to submit answer.', severity: 'error' });
                console.error('Error submitting answer:', error);
            }
        }
    }

    useEffect(() => {
        const getFormData = async () => {
            try {
                const data = await fetchForm(formId);
                setFormData(data);
                setTitle(data.title);
                setDescription(data.description);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        getFormData();
    }, [formId]);

    return (
        <div className="full-width">
            {formCompletionStatus === "completed" ? (
                <FormFilledComponent />
            ) : ((questionObj && responseId) ? (
                <QuestionComponent
                    question={questionObj.question}
                    response_type={questionObj.response_type}
                    options={questionObj.options}
                    onSubmitResponse={handleQuestionSubmit}
                />
            ) : (
                formData && (!openRespondentInformation ? (
                    <div className="respondant-information-container">
                        <FormCoverComponent
                            title={title}
                            description={description}
                            handleSubmit={() => setOpenRespondentInformation(true)}
                        />
                    </div>
                ) : (
                    <RespondentInformationComponent
                        question="May I know your name and ID"
                        onSubmitResponse={handleRespInfoSubmit}
                    />
                ))
            ))}
            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
