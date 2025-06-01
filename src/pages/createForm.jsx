import React from 'react'
import QuestionComponent from '../component.jsx/questionComponent'

export default function CreateForm() {
  return (
    <div className="full-width">
      <QuestionComponent question="What is your name?" response_type="multiple_correct" options={["Apple", "Banana", "Orange"]} onSubmitResponse={(response) => console.log(response)} />
    </div>
  )
}
