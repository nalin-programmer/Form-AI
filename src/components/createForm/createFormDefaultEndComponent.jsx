import React, { useRef } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { uploadBackgroundImages } from '../../api/adminForm.api'

export default function CreateFormDefaultEndComponent({
    ThankYouPageImage, setThankYouPageImage,
    expanded, handleAccordionChange,
    imageFolderId
}) {

    const fileInputRef = useRef(null)
    // const handleThankYouImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setThankYouPageImage(URL.createObjectURL(e.target.files[0]))
    //     }
    // }

    const handleThankYouImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const payload = new FormData();
            payload.append('question_no', '0');
            payload.append('folder_id', imageFolderId); // Replace as needed
            payload.append('page_type', 'thank_you');
            payload.append('file', file);

            try {
                const res = await uploadBackgroundImages(payload);
                setThankYouPageImage(import.meta.env.VITE_IMAGE_PREFIX + res.path);
            } catch (error) {
                // Optionally show a toast here
                console.error('Image upload failed', error);
            }
        }
    };

    return (
        <Accordion expanded={expanded === 'thankyou'} onChange={() => handleAccordionChange('thankyou')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
                sx={{ alignItems: 'center' }}
            >
                <span className="create-form-list-heading">Thank You</span>
            </AccordionSummary>
            <AccordionDetails>
                {/* Image upload */}
                <div style={{ margin: '16px 0' }}>
                    <Button
                        variant="outlined"
                        component="span"
                        onClick={() => fileInputRef.current.click()}
                        fullWidth
                    >
                        {ThankYouPageImage ? "Change Background Image" : "Add Background Image"}
                    </Button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleThankYouImageChange}
                    />
                    {ThankYouPageImage && (
                        <div style={{ marginTop: 12, textAlign: 'center' }}>
                            <img src={ThankYouPageImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
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
    )
}
