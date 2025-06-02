import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchForm } from '../api/respondantForm.api';
import FormCoverComponent from '../component.jsx/formCoverComponent';
import RespondentInformationComponent from '../component.jsx/respondantInformationComponent';

export default function Form() {
    const { formId } = useParams();
    const [formData, setFormData] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [openRespondantInformation, setOpenRespondentInformation] = useState(false);
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
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
            {openRespondantInformation == false && formData && (
                <div className="respondant-information-container">
                    <FormCoverComponent
                        title={title}
                        description={description}
                        handleSubmit={() => setOpenRespondentInformation(true)}
                    />
                </div>
            )}
            {openRespondantInformation && formData && (
                <RespondentInformationComponent
                    question="May I know your name and ID"
                    onSubmitResponse={(response) => {
                        setUsername(response.name);
                        setUserID(response.id);
                    }}
                />
            )}
        </div>
    )
}
