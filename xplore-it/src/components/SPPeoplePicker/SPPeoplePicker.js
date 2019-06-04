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
    // Create Functional Component
    // --------------------------------------
    const SPPeoplePicker = (props) => {

        const { name } = props;
		console.log("TCL: SPPeoplePicker -> name", name)
        
        return (
            
            
                // <div
                //     id = {`peoplePicker${name}`}  
                //     name = {`peoplePicker${name}`}  
                //     className="peoplePicker form-control int-textInput ">
                // </div>
            
            
                <div 
                    id = {`peoplePicker${name}`}  
                    name = {`peoplePicker-${name}`}  
                    
                    // tabIndex = {tabIndex}
                    // onFocus = {props.checkErrorClass}
                    // onBlur = {props.checkErrorClass}
                    className="peoplePicker form-control int-textInput ">
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
// --------------------------------------
    export default SPPeoplePicker;