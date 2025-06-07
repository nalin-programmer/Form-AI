import React, { useState } from 'react'
import "../styles/createForm.css";
import CreateFormDefaultComponent from '../components/createFormDefaultComponent'
import CreateFormAddQuestionComponent from '../components/createFormAddQuestionComponent';

export default function CreateForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [WelcomePageImage, setWelcomePageImage] = useState(null)
  const [PersonalInformationImage, setPersonalInformationImage] = useState(null)
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
        <CreateFormAddQuestionComponent questionsList={questionsList} setQuestionsList={setQuestionsList} />
      </div>
      {/* Right: fixed, non-scrollable */}
      <div className="create-form-right">
        {/* Your right panel content */}
      </div>
    </div>
  )
}
