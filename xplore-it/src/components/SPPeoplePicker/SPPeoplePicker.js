/* ==========================================================================
** Sharepoint People Picker Component
** 14/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import PropTypes from 'prop-types';


    // --------------------------------------
    // Preload PeoplePicker
    // --------------------------------------

    
    const loadPicker = (pickerName, value, dynamicPicker) => {
        console.log("TCL: loadPicker -> pickerName", pickerName)
        console.log("TCL: loadPicker -> value", value)
        setTimeout(() => {
                    
            window.initializePeoplePicker(`peoplePicker${pickerName}`, '175px', 19);

            if( dynamicPicker === true && value ) {
                console.log("TCL: loadPicker -> dynamicPicker", dynamicPicker)

                window.fillPeoplePicker(value, pickerName);
            }
                
            
                

        }, 0);
    }


    // --------------------------------------
    // Create Functional Component
    // --------------------------------------
    const SPPeoplePicker = (props) => {

        const { name,index, value, dynamicPicker } = props;
		console.log("TCL: SPPeoplePicker -> name", name)
        
        return (
     
            
                <div onLoad = {loadPicker(name, value, dynamicPicker)}
                    id = {`peoplePicker${name}`}  
                    name = {`peoplePicker${name}-${index}`}  
                    onBlur = {props.onBlur}
                    onFocus = {props.onFocus}
                    className="xpl-peoplePicker xpl-form-control ">
                </div>
            
        )
    }



    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    SPPeoplePicker.propTypes = {
        props: PropTypes
    };



// --------------------------------------
// Export Component
// Use React Memo to disable re-render
// Of component
// --------------------------------------
    // export default SPPeoplePicker;
    export default React.memo(SPPeoplePicker)