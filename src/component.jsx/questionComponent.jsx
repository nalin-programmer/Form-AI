import React, { useState } from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { ReactTyped } from "react-typed";

const QuestionComponent = ({ question, response_type, options = [], onSubmitResponse }) => {
    const [textResponse, setTextResponse] = useState("");
    const [singleResponse, setSingleResponse] = useState("");
    const [multipleResponse, setMultipleResponse] = useState([]);
    const [showInput, setShowInput] = useState(false);
    // Handlers
    const handleTextChange = (e) => {
        setTextResponse(e.target.value);
    };

    const handleSingleChange = (e) => {
        setSingleResponse(e.target.value);
    };

    const handleMultipleChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setMultipleResponse((prev) => [...prev, value]);
        } else {
            setMultipleResponse((prev) => prev.filter((item) => item !== value));
        }
    };

    const handleSubmit = () => {
        if (response_type === "text" && textResponse.trim()) {
            onSubmitResponse(textResponse.trim());
            setTextResponse("");
            setShowInput(false);
        } else if (response_type === "single_correct" && singleResponse) {
            onSubmitResponse(singleResponse);
            setSingleResponse("");
            setShowInput(false);
        } else if (response_type === "multiple_correct" && multipleResponse.length > 0) {
            onSubmitResponse(multipleResponse);
            setMultipleResponse([]);
            setShowInput(false);
        }
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
                {response_type === "text" && (
                    <div className="input-group">
                        <TextField
                            label="Type your answer..."
                            variant="standard"
                            value={textResponse}
                            onChange={handleTextChange}
                            fullWidth
                        />
                        <Button variant="contained" onClick={() => handleSubmit(textResponse)} sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </div>
                )}

                {response_type === "single_correct" && (
                    <div className="single-correct-group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select One Option</FormLabel>
                            <RadioGroup
                                name="single-options"
                                value={singleResponse}
                                onChange={handleSingleChange}
                            >
                                {options.map((opt, idx) => (
                                    <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" onClick={() => handleSubmit(singleResponse)} sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </div>
                )}

                {response_type === "multiple_correct" && (
                    <div className="multiple-correct-group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select All That Apply</FormLabel>
                            <FormGroup>
                                {options.map((opt, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        control={
                                            <Checkbox
                                                checked={multipleResponse.includes(opt)}
                                                onChange={handleMultipleChange}
                                                value={opt}
                                            />
                                        }
                                        label={opt}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                        <Button variant="contained" onClick={() => handleSubmit(multipleResponse)} sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </div>
                )}
            </>)}
        </div>
    );
};

export default QuestionComponent;
