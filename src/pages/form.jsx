import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createResponse, fetchForm } from '../api/respondentForm.api';
import FormCoverComponent from '../component.jsx/formCoverComponent';
import RespondentInformationComponent from '../component.jsx/respondentInformationComponent';
import QuestionComponent from '../component.jsx/questionComponent';
import { updateResponse } from '../api/respondentForm.api';
import FormFilledComponent from '../component.jsx/formFilledComponent';

export default function Form() {
    const { formId } = useParams();
    const [formData, setFormData] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [openRespondentInformation, setOpenRespondentInformation] = useState(false);
    const [formCompletionStatus, setFormCompletionStatus] = useState("incomplete");

    const [responseId, setResponseId] = useState("");
    const [questionObj, setQuestionObj] = useState(null);

    const handleRespInfoSubmit = async (respondentName, respondentId) => {
        const responseData = await createResponse(formId, respondentName, respondentId);
        setResponseId(responseData.response_id);
        setQuestionObj(responseData.question);
        setFormCompletionStatus(responseData.response_status);
    }

    const handleQuestionSubmit = async (answer) => {
        if (responseId && questionObj) {
            const responseData = await updateResponse(responseId, questionObj.question_no, answer);
            setQuestionObj(responseData.question);
            setFormCompletionStatus(responseData.response_status);
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

        </div>
    )
}
