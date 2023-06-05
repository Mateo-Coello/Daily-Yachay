import React, { useState, useEffect, useCallback } from 'react';
import '../styles/comments.css';

const DynamicTextarea = ({ inputValue, setInputValue }) => {
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const textareaRef = React.createRef();
    const maxTextareaHeight = 100; // Maximum height in pixels

    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            setTextareaHeight(`${textareaRef.current.scrollHeight}px`);

            if (textareaRef.current.scrollHeight > maxTextareaHeight) {
                textareaRef.current.style.height = `${maxTextareaHeight}px`;
                setTextareaHeight(`${maxTextareaHeight}px`);
            }
        }
    }, [textareaRef, maxTextareaHeight]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [adjustTextareaHeight]);

    const handleInputChange = (event) => {
        adjustTextareaHeight();
        setInputValue(event.target.value);
    };

    return (
        <textarea
            className="dynamic-textarea"
            style={{ height: textareaHeight }}
            value={inputValue}
            ref={textareaRef}
            onChange={handleInputChange}
            placeholder="Add a comment"
        />
    );
};

export default DynamicTextarea;
