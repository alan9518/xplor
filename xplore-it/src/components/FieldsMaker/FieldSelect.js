/* ==========================================================================
** Field Icon Container
** 03/05/2019
** Alan Medina Silva
** ========================================================================== */



// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import {SingleSelect, MultipleSelect} from '../../components'
    



// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldSelect = (props) => {
        const {
            colName, fieldName,  inputName, fieldValue, 
            optionsData,  editField, allowFilter, 
            mandatory,  sequence, 
            defaultComboValue, wideControl, mediumControl, extraWideControl,
            isMulti, placeholder
        } = props;
        
        // Set Class
            let controlWidthName = '';
            if(wideControl)
                controlWidthName = '-wide';
            else if(mediumControl) 
                controlWidthName = '-medium';
            else if(extraWideControl) 
                controlWidthName = '-extra-wide';
            else 
                controlWidthName  = '';

        // --------------------------------------
        // Set Class Name & Class Name Prefix
        // --------------------------------------

        // const selectClassName = wideControl === true ? 'react-select-container-wide' :'react-select-container';
        // const selectClassPrefix = wideControl === true ? 'react-select-wide' :'react-select';

        const validateClass = mandatory && 'int-validate' ;
        const selectClassName = `react-select-container${controlWidthName}`;
        // className = {  Mandatory ? 'int-textInput int-validate ' : 'int-textInput'  }
        
        const selectClassPrefix = `react-select${controlWidthName}`;
        // console.log("TCL: FieldSelect -> this", this)

        return (
            <div className={colName}>

                <div className="xpl-fieldItem" >

                    <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>

                       {
                           isMulti === true 
                           ?
                                <MultipleSelect 
                                    options = {optionsData || [] }
                                    name = {inputName} 
                                    className = {selectClassName} 
                                    classNamePrefix = {selectClassPrefix} 
                                    defaultValue = {defaultComboValue}
                                    onChange = {props.onChangeInput.bind(this,inputName)}
                                    value = {fieldValue}
                                    id = {inputName}
                                    inputId  = {inputName}
                                    isSearchable = {allowFilter ? true : false}
                                    tabIndex = {sequence}
                                    placeholder= {placeholder || 'Select Options'}
                                />

                            :
                                <SingleSelect 
                                    options = {optionsData || [] } 
                                    name = {inputName} 
                                    className = {selectClassName} 
                                    classNamePrefix = {selectClassPrefix} 
                                    defaultValue = {defaultComboValue}
                                    // onChange = {props.onChangeInput}
                                    onChange = {props.onChangeInput.bind(this,inputName)}
                                    value = {fieldValue}
                                    id = {inputName}
                                    inputId  = {inputName}
                                    isSearchable = {allowFilter ? true : false}
                                    isDisabled = {!editField}
                                    tabIndex = {sequence}
                                    placeholder= {placeholder || 'Select Option'} 
                                />
                       }

                </div>
            </div>
        )
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldSelect.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldSelect.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };


// --------------------------------------
// Export Component
// --------------------------------------
export default FieldSelect;