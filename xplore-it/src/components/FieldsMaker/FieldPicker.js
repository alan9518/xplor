/* ==========================================================================
** FIeld Layout For People Picker
** 14/02/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import { ToolTip } from '../../components';
    import PropTypes from 'prop-types';
    import { AddInputButton, SPPeoplePicker } from '../../components'
    import ReactTooltip from 'react-tooltip'


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldPicker = (props) => {

        // const { Field_Name, Field_State_Name, Mandatory, columns,  Enabled, hasToolTip, toolTipText,  value, Sequence} = props.data;


        const { colName, fieldName, editField, inputName, onPickerChange, dynamicPicker, inputValue } = props;
        let enabledClass = editField === false ? 'xpl-controlDisabled' : 'xpl-controlEnabled';
        let pickerName = inputName.replace(' ', '')
        // const { renderBorder } = props;
        // const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
        // const inputWidth = columns === 2 ? 175 : 300;
        // let classNames = Enabled === false ? 'int-controlDisabled' : 'int-controlEnabled';

        // maxWidth: 400 


        return (
            <div className={colName} id = {`${pickerName}-container`}>

            <div className = {`xpl-fieldPicker ${enabledClass} `}>

                <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>
                <SPPeoplePicker 
                    name={pickerName} 
                    value={inputValue} 
                    // onChange={props.onChange} 
                    // tabIndex = {Sequence} 
                    enabled = {true}
                />
                
                    
            
            </div>
        </div>

        )
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldPicker.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldPicker.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };

// --------------------------------------
// Export Component
// --------------------------------------
export default FieldPicker;
