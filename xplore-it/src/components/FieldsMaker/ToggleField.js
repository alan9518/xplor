/* ==========================================================================
** Toogle Item Field Component
** 22/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import Toggle from 'react-toggle'
    import "react-toggle/style.css" // for ES6 modules


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ToggleField = (props) => {

        const {colName, fieldName, fieldValue} = props;
		// console.log('​ToggleField -> props', props)
        const isActive = fieldValue === "N" ? false : true;
        return (

            <div className = {colName}>

                <div className="xpl-fieldItem">
                    <h6 className = "xpl-boldText xpl-fieldSeparator"> {fieldName} </h6> 
                    <Toggle
                        defaultChecked={isActive}
                        disabled = {true} />
                        {/* <span className='label-text'> {fieldValue}  </span> */}
                </div>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ToggleField.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default ToggleField;