/* ==========================================================================
 * Custom Single Option Select Component 
 * Using react-Singleselect 
 * 15/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React  from "react";
    import PropTypes from "prop-types";
    import Select from 'react-select';

// --------------------------------------
// Create Component Class
// --------------------------------------
    const SingleSelect = (props) => {
        return (

            <Select
                className= {props.className}
                classNamePrefix = {props.classNamePrefix}
                // className='react-select-container'
                // classNamePrefix="react-select"
                defaultValue={props.defaultValue}
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
                placeholder= {props.placeholder}
            />

            // <Select  
            //     className="basic-single"
            //     classNamePrefix="Categfories"
            //     defaultValue={'Categories'}
            //     isDisabled={props.isDisabled}
            //     isLoading={props.isLoading}
            //     isClearable={props.isClearable}
            //     isRtl={props.isRtl}
            //     isSearchable={props.isSearchable}
            //     name="color"
            //     options={props.options}
            // />
        )
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    SingleSelect.propTypes = {
        options: PropTypes.array,
        isClearable: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isLoading: PropTypes.bool,
        isRtl: PropTypes.bool,
        isSearchable: PropTypes.bool,
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default SingleSelect;
