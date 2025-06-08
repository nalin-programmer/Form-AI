import React, { useState } from 'react'
import "../styles/createForm.css";
import CreateFormDefaultComponent from '../components/createForm/createFormDefaultComponent'
import CreateFormAddQuestionComponent from '../components/createForm/createFormAddQuestionComponent';
import CreateFormDefaultEndComponent from '../components/createForm/createFormDefaultEndComponent';

export default function CreateForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [WelcomePageImage, setWelcomePageImage] = useState(null)
  const [PersonalInformationImage, setPersonalInformationImage] = useState(null)
  const [ThankYouPageImage, setThankYouPageImage] = useState(null)

  const [questionsList, setQuestionsList] = useState([])

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
        />
        <CreateFormAddQuestionComponent
          questionsList={questionsList}
          setQuestionsList={setQuestionsList}
        />
        <CreateFormDefaultEndComponent
          ThankYouPageImage={ThankYouPageImage}
          setThankYouPageImage={setThankYouPageImage}
        />
      </div>
      {/* Right: fixed, non-scrollable */}
      <div className="create-form-right">
        {/* Your right panel content */}
      </div>
    </div>
  )
}
