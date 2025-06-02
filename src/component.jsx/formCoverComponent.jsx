import React, { useState } from 'react'
import { ReactTyped } from 'react-typed';

export default function FormCoverComponent({ title, description }) {
    const [showInput, setShowInput] = useState(false);
    return (
        <div className="question-container">
            <ReactTyped
                className="question-text form-cover-title"
                strings={[title || ""]}
                typeSpeed={parseInt(import.meta.env.VITE_REACT_APP_TYPE_SPEED) || 50}
                showCursor={false}
                onComplete={() => setShowInput(true)}
            />
            {showInput && <p className='form-cover-description'>{description}</p>}
        </div>
    )
}
