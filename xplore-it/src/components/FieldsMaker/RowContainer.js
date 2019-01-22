/* ==========================================================================
** Bootstrap Row Container For Dynamic Grid
** 22/01/2019
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
    const RowContainer = (props) => {
        return (
            <div classname = "row">

                {props.children}

            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    RowContainer.propTypes = {
        children: PropTypes.any
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default RowContainer;