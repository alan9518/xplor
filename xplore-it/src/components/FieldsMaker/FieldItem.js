/* ==========================================================================
** Field Item Component
** 22/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldItem = (props) => {

        const {colName, fieldName, fieldValue} = props;

        return (
            <div className = {colName}>

                <div className="xpl-fieldItem">

                    <h6 className = "xpl-boldText"> {fieldName} </h6> 
                    <p> {fieldValue}  </p>

                </div>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FieldItem.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldItem;