/* ==========================================================================
 * App Button With Material Design 
 * 09/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
import React from "react";
import PropTypes from "prop-types";

    // --------------------------------------
    // Create and Export Component
    // xpl-toggleButton
    // --------------------------------------
    const MaterialButton = (props) => {
        return (
            <div className="xpl-sidebarButton" onClick = {props.onClick}>
                <button className={`xpl-button ${props.buttonClass}`}>
                    {props.buttonText}
                    <i className = {`${props.iconClass}`} />
                </button>
            </div>
        );
    };

// --------------------------------------
// Prop Types
// --------------------------------------
    MaterialButton.propTypes = {
        onClick: PropTypes.func,
        buttonClass : PropTypes.string,
        buttonText : PropTypes.string,
        iconClass : PropTypes.string
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default MaterialButton;
