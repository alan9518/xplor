/* ==========================================================================
 * Button Layout Component
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
        return (
                <button className={`xpl-button ${props.buttonClass}`} onClick = {props.onClick}>
                    {props.iconLeftClass && <i className = {` xpl-iconLeft ${props.iconLeftClass }`} /> }
                    {props.buttonText}
                    {props.iconClass && <i className = {`${props.iconClass}`} /> }
                </button>
        );
    };

// --------------------------------------
// Prop Types
// --------------------------------------
    AppButton.propTypes = {
        onClick: PropTypes.func,
        buttonClass : PropTypes.string,
        buttonText : PropTypes.string,
        iconLeftClass : PropTypes.string,
        iconClass : PropTypes.string
    };


// --------------------------------------
// Set Default Props
// --------------------------------------
    AppButton.defaultProps = {
        iconLeftClass : '',
        buttonClass : ''
    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default AppButton;


