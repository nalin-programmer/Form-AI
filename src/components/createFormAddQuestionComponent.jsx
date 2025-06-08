import React, { useRef, useState } from 'react'
import {
    Accordion, AccordionSummary, AccordionDetails, IconButton, TextField, Button, ButtonGroup
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'

export default function CreateFormAddQuestionComponent({ questionsList, setQuestionsList }) {
    const [expanded, setExpanded] = useState(false)
    const fileInputRefs = useRef({})

    // Add a new question
    const handleAddQuestion = (type) => {
        let newQuestion = {
            question_no: questionsList.length + 1,
            response_type: type,
            question: '',
            image: ''
        }
        if (type === 'single_correct' || type === 'multiple_correct') {
            newQuestion.options = [''] // Initialize with one empty option
        }
        setQuestionsList([...questionsList, newQuestion])
        setExpanded(questionsList.length) // expand the new one
    }

    // Delete a question
    const handleDelete = (idx) => {
        const updated = questionsList.filter((_, i) => i !== idx)
            .map((q, i) => ({ ...q, question_no: i + 1 }))
        setQuestionsList(updated)
    }

    // Update a question field
    const handleChange = (idx, field, value) => {
        const updated = [...questionsList]
        updated[idx][field] = value
        setQuestionsList(updated)
    }

    // Handle option change
    const handleOptionChange = (qIdx, oIdx, value) => {
        const updated = [...questionsList]
        updated[qIdx].options[oIdx] = value
        setQuestionsList(updated)
    }

    // Add option
    const handleAddOption = (qIdx) => {
        const updated = [...questionsList]
        updated[qIdx].options.push('')
        setQuestionsList(updated)
    }

    // Delete option
    const handleDeleteOption = (qIdx, oIdx) => {
        const updated = [...questionsList]
        updated[qIdx].options.splice(oIdx, 1)
        setQuestionsList(updated)
    }

    // Handle image upload
    const handleImageChange = (idx, e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                handleChange(idx, 'image', ev.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    // Save button (could be used to trigger validation or API call)
    const handleSave = () => {
        setExpanded(false)
    }

    return (
        <div className='question-list'>
            <div>
                {questionsList.map((q, idx) => (
                    <Accordion
                        key={q.question_no}
                        expanded={expanded === idx}
                        onChange={() => setExpanded(expanded === idx ? false : idx)}
                        className="form-component-list-item"
                        sx={{ background: '#fff', color: '#222' }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${idx}-content`}
                            id={`panel${idx}-header`}
                            sx={{ alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flexGrow: 1, fontWeight: 600 }}>
                                    Q{q.question_no} ({q.response_type.replace('_', ' ').toUpperCase()})
                                </span>
                                <IconButton
                                    size="small"
                                    color="error"
                                    aria-label="delete"
                                    onClick={e => { e.stopPropagation(); handleDelete(idx) }}
                                    style={{ marginLeft: 8 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Question"
                                multiline
                                fullWidth
                                minRows={1}
                                maxRows={6}
                                value={q.question}
                                onChange={e => handleChange(idx, 'question', e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            {/* Options for radio/checkbox */}
                            {(q.response_type === 'single_correct' || q.response_type === 'multiple_correct') && (
                                <div style={{ marginBottom: 16 }}>
                                    {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                                            <TextField
                                                label={`Option ${oIdx + 1}`}
                                                value={opt}
                                                onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                aria-label="delete option"
                                                onClick={() => handleDeleteOption(idx, oIdx)}
                                                disabled={q.options.length <= 1}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleAddOption(idx)}
                                        size="small"
                                    >
                                        Add Option
                                    </Button>
                                </div>
                            )}
                            {/* Image upload */}
                            <div style={{ margin: '16px 0' }}>
                                <Button
                                    variant="outlined"
                                    component="span"
                                    onClick={() => fileInputRefs.current[idx].click()}
                                    fullWidth
                                >
                                    {q.image ? "Change Background Image" : "Add Background Image"}
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={el => (fileInputRefs.current[idx] = el)}
                                    style={{ display: 'none' }}
                                    onChange={e => handleImageChange(idx, e)}
                                />
                                {q.image && (
                                    <div style={{ marginTop: 12, textAlign: 'center' }}>
                                        <img src={q.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
                                    </div>
                                )}
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                fullWidth
                                onClick={() => handleSave(idx)}
                            >
                                Save
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
            <ButtonGroup
                variant="outlined"
                aria-label="question type button group"
                className="question-button-group"
                fullWidth
                style={{ marginTop: '1rem' }}
            >
                <Button onClick={() => handleAddQuestion('text')}>TEXT</Button>
                <Button onClick={() => handleAddQuestion('single_correct')}>RADIO</Button>
                <Button onClick={() => handleAddQuestion('multiple_correct')}>CHECKBOX</Button>
            </ButtonGroup>
        </div>
    )
}
