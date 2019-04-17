/* ==========================================================================
** Single Button
** 28/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import './styles.css';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const SingleButton = (props) => {
        const {buttonText, value, onClick,  } = props;
        // const disabledClass = !disbaledButton && '.xpl-disabledLink';
        return (
            <button 
                onClick = {onClick} 
                className = "xpl-singleButton"
                value = {value}
            >
                {buttonText}
            </button>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    SingleButton.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default SingleButton;