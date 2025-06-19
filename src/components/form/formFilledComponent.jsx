import React from 'react'
import { ReactTyped } from 'react-typed'

export default function FormFilledComponent({ backgroundImageUrl }) {
    return (
        <div
            className="question-container"
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <ReactTyped
                className="question-text"
                strings={["Thank you for filling out the form!"]}
                typeSpeed={parseInt(import.meta.env.VITE_REACT_APP_TYPE_SPEED) || 50}
                showCursor={false}
            />
        </div>
    )
}
