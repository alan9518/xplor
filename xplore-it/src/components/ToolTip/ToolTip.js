/* ==========================================================================
** Custom ToolTip Component
** Using https://github.com/wwayne/react-tooltip
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ToolTip = (props) => {
        const {tipText} = props;
        return (
            
                <span data-tip = {tipText}  >
                    ...
                    
                </span>
        )
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ToolTip.propTypes = {
        tipText: PropTypes.string
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default ToolTip;