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
    // import ReactTooltip from 'react-tooltip'
    // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    // import { faQuestionCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ToolTip = (props) => {
        const {tipText, isButton} = props;
        return (
            
                <span data-tip = {tipText}  >
                    ...
                    {/*isButton  === true ? <FontAwesomeIcon icon={faPlus}  /> : <FontAwesomeIcon icon={faQuestionCircle} />*/}
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