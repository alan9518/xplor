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
    import './styles.css';

    // --------------------------------------
    // Create and Export Component
    // xpl-toggleButton
    // --------------------------------------
    const MaterialButton = (props) => {
        return (
            <div className = 'xpl-materialButton'>
                <button className='pure-material-button-contained'>
                    {props.buttonText}
                </button>
            </div>
                
        )
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
