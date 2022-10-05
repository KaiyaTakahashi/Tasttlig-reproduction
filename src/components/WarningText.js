import React from "react"
import "../styling/components.css"

const WarningText = ({ text, isHidden }) => {
    if (isHidden) {
        return null;
    }
    return (
        <h6 id="warning-text">{text}</h6>
    );
};

export default WarningText;