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
// xpl-toggleButton
// --------------------------------------
    const AppButton = (props) => {
        console.log('props', props);
        return (
            <div className="xpl-sidebarButton" onClick = {props.onClick}>
                <button className={`xpl-button ${props.buttonClass}`}>
                    {/* <i className="fas fa-bars" /> */}
                    {props.children } 
                </button>
            </div>
        );
    };

// --------------------------------------
// Prop Types
// --------------------------------------
    // AppButton.propTypes = {
    //     resourceMail: PropTypes.object
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default AppButton;


