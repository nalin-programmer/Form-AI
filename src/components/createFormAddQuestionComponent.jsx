import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

export default function CreateFormAddQuestionComponent({ questionsList, setQuestionsList }) {
    return (
        <>
            <ButtonGroup
                variant="outlined"
                aria-label="Basic button group"
                className="question-button-group"
                fullWidth
            >
                <Button>TEXT</Button>
                <Button>RADIO</Button>
                <Button>CHECKBOX</Button>
            </ButtonGroup>
        </>
    )
}
