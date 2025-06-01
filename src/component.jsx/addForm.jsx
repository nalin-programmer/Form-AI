import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

export default function AddForm() {
    return (
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => {/* open modal */ }}>
            Add Form
        </Button>
    )
}
