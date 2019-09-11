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



    const { colName, fieldName, editField, inputName,  userName, dynamicPicker, fieldValue, index } = props;
    // let enabledClass = editField === false ? 'xpl-controlDisabled' : 'xpl-controlEnabled';
    let pickerName = inputName.replace(' ', '')


    const delveURL = `https://flextronics365.sharepoint.com/_layouts/15/me.aspx/?p=${fieldValue.toLowerCase()}&v=work`





    




    return (
        <div className={colName} id = {`${pickerName}-container-${index}`} >

        

            <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>


            {
                editField === true 
                ?
                    <SPPeoplePicker 
                        name={pickerName} 
                        value={fieldValue} 
                        onBlur = {props.onBlur}
                        onFocus = {props.onFocus}
                        enabled = {true}
                        index = {index}
                        dynamicPicker = {dynamicPicker}
                    />
                :
                fieldValue !== "" 
                ? 
                    <p>  <a href = {delveURL} target = "_blank" rel="noopener noreferrer"> {userName}   </a> </p>   
                :
                    <p>  {userName}  </p>   

            
            }

           
            
                
        
        
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
