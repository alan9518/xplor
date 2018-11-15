/* ==========================================================================
 * Multiple Options Select 
 * Using React-Select 
 * 15/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import Select from 'react-select';


// --------------------------------------
// Create and Export Select
// --------------------------------------
    
    const MultipleSelect = (props) => (
        <Select
            isMulti
            // defaultValue={props.options[1]}
            defaultValue = {props.defaultValue}
            options={props.options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );


// --------------------------------------
// Export Component
// --------------------------------------
    export default MultipleSelect;


// --------------------------------------
// Prop Types
// --------------------------------------
    MultipleSelect.propTypes = {
        options: PropTypes.array,
        isClearable: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isLoading: PropTypes.bool,
        isRtl: PropTypes.bool,
        isSearchable: PropTypes.bool,
    };