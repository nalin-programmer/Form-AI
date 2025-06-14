import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function AddForm() {
    const navigate = useNavigate();
    return (
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => { navigate('/form/create') }}>
            Add Form
        </Button>
    )
}

