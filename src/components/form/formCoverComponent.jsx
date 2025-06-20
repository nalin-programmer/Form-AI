import { Button } from '@mui/material';
import React, { useState, useRef } from 'react'
import { ReactTyped } from 'react-typed';

export default function FormCoverComponent({ title, description, handleSubmit, backgroundImageUrl }) {
    const [showInput, setShowInput] = useState(false);
    const buttonRef = useRef(null);

    // useEffect(() => {
    //     if (showInput) {
    //         buttonRef.current?.focus();   // now Enter triggers a click ► submit
    //     }
    // }, [showInput]);
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="question-container"
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <ReactTyped
                    className="question-text form-cover-title"
                    strings={[title || ""]}
                    typeSpeed={parseInt(import.meta.env.VITE_REACT_APP_TYPE_SPEED) || 50}
                    showCursor={false}
                    onComplete={() => setShowInput(true)}
                />
                {showInput && <div>
                    <p className='form-cover-description'>{description}</p>
                    <Button variant="contained" ref={buttonRef} type="submit" sx={{ mt: 2 }}>
                        Start
                    </Button></div>}
            </div>
        </form>
    )
}
