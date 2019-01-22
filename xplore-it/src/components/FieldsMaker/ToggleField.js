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
    import './styles.css';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ToggleField = (props) => {

        const {colName, fieldName, fieldValue} = props;

        return (
            <div className = {colName}>

                <div className="xpl-ToggleField">
                    <input class="tgl tgl-flat" id="cb4" type="checkbox"/>
                    <label class="tgl-btn" for="cb4"></label>
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