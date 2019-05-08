/* ==========================================================================
 * Multiple Options Select 
 * Using React-Select 
 * 15/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";
    import Select from 'react-select';


// --------------------------------------
// Create and Export Select
// --------------------------------------
    
    const MultipleSelect = (props) => (
        <Select
            isMulti
            className= {props.className}
            classNamePrefix = {props.classNamePrefix}
            defaultValue = {props.defaultValue}
            isDisabled={props.isDisabled}
            isLoading={props.isLoading}
            isClearable={props.isClearable}
            isRtl={props.isRtl}
            isSearchable={props.isSearchable}
            name={props.controlName}
            inputId={props.inputId}
            id={props.id}
            options={props.options}
            value = {props.selectedValue}
            onChange = {props.onChange}
            tabIndex = {props.tabIndex}
            closeMenuOnSelect = {false}
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