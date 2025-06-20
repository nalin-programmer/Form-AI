import React, { useRef } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { uploadBackgroundImages } from '../../api/adminForm.api'

export default function CreateFormDefaultComponent({
    title, description, setTitle, setDescription,
    WelcomePageImage, setWelcomePageImage,
    PersonalInformationImage, setPersonalInformationImage,
    expanded, handleAccordionChange,
    imageFolderId
}) {
    const welcomeFileInputRef = useRef(null)
    const personalFileInputRef = useRef(null)

    // const handleWelcomeImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setWelcomePageImage(URL.createObjectURL(e.target.files[0]))
    //     }
    // }
    const handleWelcomeImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const payload = new FormData();
            payload.append('question_no', '0');
            payload.append('folder_id', imageFolderId); // Replace as needed
            payload.append('page_type', 'welcome_page');
            payload.append('file', file);

            try {
                const res = await uploadBackgroundImages(payload);
                setWelcomePageImage(import.meta.env.VITE_IMAGE_PREFIX + res.path);
            } catch (error) {
                // Optionally show a toast here
                console.error('Image upload failed', error);
            }
        }
    };

    const handlePersonalImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const payload = new FormData();
            payload.append('question_no', '0');
            payload.append('folder_id', imageFolderId); // Replace as needed
            payload.append('page_type', 'personal_information');
            payload.append('file', file);

            try {
                const res = await uploadBackgroundImages(payload);
                setPersonalInformationImage(import.meta.env.VITE_IMAGE_PREFIX + res.path);
            } catch (error) {
                // Optionally show a toast here
                console.error('Image upload failed', error);
            }
        }
    };

    // const handlePersonalImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setPersonalInformationImage(URL.createObjectURL(e.target.files[0]))
    //     }
    // }

    return (
        <>
            <Accordion expanded={expanded === 'welcome'} onChange={() => handleAccordionChange('welcome')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                    sx={{ alignItems: 'center' }}
                >
                    <span className="create-form-list-heading">Welcome Page</span>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label="Title"
                        multiline
                        fullWidth
                        minRows={1}
                        maxRows={6}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Description"
                        multiline
                        fullWidth
                        minRows={1}
                        maxRows={6}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    {/* Image upload */}
                    <div style={{ margin: '16px 0' }}>
                        <Button
                            variant="outlined"
                            component="span"
                            onClick={() => welcomeFileInputRef.current.click()}
                            fullWidth
                        >
                            {WelcomePageImage ? "Change Background Image" : "Add Background Image"}
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={welcomeFileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleWelcomeImageChange}
                        />
                        {WelcomePageImage && (
                            <div style={{ marginTop: 12, textAlign: 'center' }}>
                                <img src={WelcomePageImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
                            </div>
                        )}
                    </div>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        Save
                    </Button> */}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'personal'} onChange={() => handleAccordionChange('personal')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                    sx={{ alignItems: 'center' }}
                >
                    <span className="create-form-list-heading" >Personal Information</span>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label="Your Name"
                        disabled
                        multiline
                        fullWidth
                        minRows={1}
                        maxRows={6}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Your ID"
                        disabled
                        multiline
                        fullWidth
                        minRows={1}
                        maxRows={6}
                        margin="normal"
                        variant="outlined"
                    />
                    {/* Image upload */}
                    <div style={{ margin: '16px 0' }}>
                        <Button
                            variant="outlined"
                            component="span"
                            onClick={() => personalFileInputRef.current.click()}
                            fullWidth
                        >
                            {PersonalInformationImage ? "Change Background Image" : "Add Background Image"}
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={personalFileInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePersonalImageChange}
                        />
                        {PersonalInformationImage && (
                            <div style={{ marginTop: 12, textAlign: 'center' }}>
                                <img src={PersonalInformationImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
                            </div>
                        )}
                    </div>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        Save
                    </Button> */}
                </AccordionDetails>

            </Accordion>
        </>
    )
}
