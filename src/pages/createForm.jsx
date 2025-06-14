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

export default function CreateForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [WelcomePageImage, setWelcomePageImage] = useState(null)
  const [PersonalInformationImage, setPersonalInformationImage] = useState(null)
  const [ThankYouPageImage, setThankYouPageImage] = useState(null)
  const [questionsList, setQuestionsList] = useState([])
  const [expanded, setExpanded] = useState('welcome') // Track which accordion is open

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

    await createForm(payload);
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
        />
        <CreateFormAddQuestionComponent
          questionsList={questionsList}
          setQuestionsList={setQuestionsList}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />
        <CreateFormDefaultEndComponent
          ThankYouPageImage={ThankYouPageImage}
          setThankYouPageImage={setThankYouPageImage}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
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
            image={WelcomePageImage}
            handleSubmit={() => setExpanded('profile')}
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
            />
          ) : null
        })()}
        {expanded === 'personal' && (
          <RespondentInformationComponent
            question="May I know your name and ID"
          />
        )}
        {expanded === 'thankyou' && (
          <FormFilledComponent />
        )}
      </div>
    </div>
  )
}
