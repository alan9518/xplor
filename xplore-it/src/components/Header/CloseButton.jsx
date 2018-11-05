/* ==========================================================================
 * Add New App Button on Content Header Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";

// --------------------------------------
// Create and Export Component
// --------------------------------------
    const CloseButton = (props) => {
        console.log('props', props);
        return (
            <button className="xpl-button xpl-closeButton" onClick = {props.onClick}>
                <i className="fas fa-times" />
            </button>
        );
    };

// --------------------------------------
// Prop Types
// --------------------------------------
    // CloseButton.propTypes = {
    //   resourceMail: PropTypes.object
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default CloseButton;


