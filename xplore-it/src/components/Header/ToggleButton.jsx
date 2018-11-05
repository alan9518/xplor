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
    const ToggleButton = (props) => {
        console.log('props', props);
        return (
            <div className="xpl-sidebarButton" onClick = {props.onClick}>
                <button className="xpl-button xpl-toggleButton">
                    <i className="fas fa-bars" />
                </button>
            </div>
        );
    };

// --------------------------------------
// Prop Types
// --------------------------------------
// ToggleButton.propTypes = {
//   resourceMail: PropTypes.object
// };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ToggleButton;


