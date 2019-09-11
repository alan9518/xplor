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
        const {buttonText, value, onClick,  wideButton, buttonName, blockButton} = props;
        // const disabledClass = !disbaledButton && '.xpl-disabledLink';

        const classNames = wideButton ? 'xpl-singleButton xpl-wideButton' : 'xpl-singleButton'

        return (
            <button 
                onClick = {onClick} 
                className = {classNames}
                value = {value}
                name = {buttonName}
                disabled = {blockButton}
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