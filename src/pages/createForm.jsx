import React from 'react'
import QuestionComponent from '../components/questionComponent'
import FormCoverComponent from '../components/formCoverComponent'
import RespondentInformationComponent from '../components/respondentInformationComponent'
import "../styles/createForm.css";

export default function CreateForm() {
  return (
    <div className="create-form-layout">
      {/* Left: scrollable */}
      <div className="create-form-left">
        {/* Place scrollable content here */}
      </div>
      {/* Right: fixed, non-scrollable */}
      <div className="create-form-right">

      </div>
    </div>
  )
}
