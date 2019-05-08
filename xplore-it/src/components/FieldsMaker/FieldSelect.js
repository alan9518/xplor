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
import {SingleSelect} from '../../components'
// import ColorPicker from '../ColorPicker/ColorPicker';



// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldColor = (props) => {
        const {
            colName, fieldName,  inputName, fieldValue, 
            optionsData,  editField, allowFilter, 
            mandatory,  sequence, 
            defaultComboValue, wideControl, mediumControl, extraWideControl
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


        return (
            <div className={colName}>

                <div className="xpl-fieldItem" >

                    <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>

                        <SingleSelect 
                            options = {optionsData} 
                            name = {inputName} 
                            className = {selectClassName} 
                            classNamePrefix = {selectClassPrefix} 
                            defaultValue = {defaultComboValue}
                            onChange = {props.onChangeInput}
                            value = {fieldValue}
                            id = {inputName}
                            inputId  = {inputName}
                            isSearchable = {allowFilter ? true : false}
                            isDisabled = {!editField}
                            tabIndex = {sequence}
                        />

                </div>
            </div>
        )
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldColor.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldColor.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };


// --------------------------------------
// Export Component
// --------------------------------------
export default FieldColor;