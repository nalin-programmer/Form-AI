import React, { useState } from 'react'
import "../styles/createForm.css";
import CreateFormDefaultComponent from '../components/createForm/createFormDefaultComponent'
import CreateFormAddQuestionComponent from '../components/createForm/createFormAddQuestionComponent'
import CreateFormDefaultEndComponent from '../components/createForm/createFormDefaultEndComponent'
import FormCoverComponent from '../components/form/formCoverComponent'
import QuestionComponent from '../components/form/questionComponent'
import RespondentInformationComponent from '../components/form/respondentInformationComponent'
import FormFilledComponent from '../components/form/formFilledComponent'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Button } from '@mui/material'
import { createForm } from '../api/adminForm.api';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { v4 as uuidv4 } from 'uuid';

export default function CreateForm() {
  const navigate = useNavigate();
  const [imageFolderId, setImageFolderId] = useState(uuidv4());
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [WelcomePageImage, setWelcomePageImage] = useState(null)
  const [PersonalInformationImage, setPersonalInformationImage] = useState(null)
  const [ThankYouPageImage, setThankYouPageImage] = useState(null)
  const [questionsList, setQuestionsList] = useState([])
  const [expanded, setExpanded] = useState('welcome') // Track which accordion is open
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' })

  const handleAccordionChange = (panel) => {
    setExpanded(prev => (prev === panel ? "none" : panel));
  }

  const handleCreateForm = async () => {
    const payload = {
      title,
      description,
      questions: questionsList,
      background_images: {
        welcome: WelcomePageImage,
        personal_information: PersonalInformationImage,
        thank_you: ThankYouPageImage
      }
    };

    try {
      await createForm(payload);
      setToast({ open: true, message: 'Form created successfully!', severity: 'success' });
      setTimeout(() => navigate("/"), 1500); // Navigate after showing toast
    } catch (error) {
      console.log(`error creating form: ${error}`)
      setToast({ open: true, message: 'Failed to create form.', severity: 'error' });
    }
  }

  return (
    <div className="create-form-layout">
      {/* Left: scrollable */}
      <div className="create-form-left">
        <CreateFormDefaultComponent
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          WelcomePageImage={WelcomePageImage}
          setWelcomePageImage={setWelcomePageImage}
          PersonalInformationImage={PersonalInformationImage}
          setPersonalInformationImage={setPersonalInformationImage}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          imageFolderId={imageFolderId}
        />
        <CreateFormAddQuestionComponent
          questionsList={questionsList}
          setQuestionsList={setQuestionsList}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          imageFolderId={imageFolderId}
        />
        <CreateFormDefaultEndComponent
          ThankYouPageImage={ThankYouPageImage}
          setThankYouPageImage={setThankYouPageImage}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          imageFolderId={imageFolderId}
        />
        <div className="create-form-button-container">
          <Button variant="contained" color="primary" startIcon={<NoteAddIcon />} className='create-form-button' onClick={handleCreateForm}>
            Create Form
          </Button>
        </div>
      </div>
      {/* Right: fixed, non-scrollable */}
      <div className="create-form-right">
        {/* Your right panel content */}
        {expanded === 'welcome' && (
          <FormCoverComponent
            title={title}
            description={description}
            // image={WelcomePageImage}
            handleSubmit={() => setExpanded('profile')}
            backgroundImageUrl={WelcomePageImage}
          />
        )}
        {expanded.startsWith('question-') && (() => {
          const idx = parseInt(expanded.split('-')[1], 10)
          const q = questionsList[idx]
          return q ? (
            <QuestionComponent
              question={q.question}
              response_type={q.response_type}
              options={q.options}
              backgroundImageUrl={q.image}
            />
          ) : null
        })()}
        {expanded === 'personal' && (
          <RespondentInformationComponent
            question="May I know your name and ID"
            backgroundImageUrl={PersonalInformationImage}
          />
        )}
        {expanded === 'thankyou' && (
          <FormFilledComponent backgroundImageUrl={ThankYouPageImage} />
        )}
      </div>
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
