import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { ReactTyped } from 'react-typed';

export default function RespondentInformationComponent({ question, onSubmitResponse }) {
    const [showInput, setShowInput] = useState(false);
    const [userNameResponse, setUserNameResponse] = useState("");
    const [userIDResponse, setUserIDResponse] = useState("");

    const handleUserNameTextChange = (e) => {
        setUserNameResponse(e.target.value);
    };
    const handleUserIDTextChange = (e) => {
        setUserIDResponse(e.target.value);
    };
    return (
        <div className="question-container">
            <ReactTyped
                className="question-text"
                strings={[question || ""]}
                typeSpeed={parseInt(import.meta.env.VITE_REACT_APP_TYPE_SPEED) || 50}
                showCursor={false}
                onComplete={() => setShowInput(true)}
            />
            {showInput && (<>
                <div className="input-group">
                    <TextField
                        label="Your Name"
                        variant="standard"
                        value={userNameResponse}
                        onChange={handleUserNameTextChange}
                        fullWidth
                    />
                    <TextField
                        label="Your ID"
                        variant="standard"
                        value={userIDResponse}
                        onChange={handleUserIDTextChange}
                        fullWidth
                    />
                    <Button variant="contained" onClick={() => onSubmitResponse(userNameResponse, userIDResponse)} sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </div>
            </>)}
        </div>
    )
}
