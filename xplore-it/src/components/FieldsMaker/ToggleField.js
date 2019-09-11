/* ==========================================================================
** Toogle Item Field Component
** 22/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React  from 'react';
    import PropTypes from 'prop-types';
    import Toggle from 'react-toggle'
    import "react-toggle/style.css" // for ES6 modules


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ToggleField = (props) => {

        const {colName, fieldName, fieldValue, editField, index} = props;
        // console.log('​ToggleField -> props', props)
        // const isActive = fieldValue === "N" ? false : true;

        let isActive = false;
        let hideToggle = false;

        //? Set Tooggle Vale
        if(fieldValue === "N" || fieldValue === "") {
            isActive = false
            // hideToggle = true
        }
            
        else if(fieldValue === null || fieldValue === undefined) {
            isActive = null;
            hideToggle = true;
        }   
            
        else    
            isActive = true;

        return (

            <div className = {colName}>

                <div className="xpl-fieldItem">
                    <h6 className = "xpl-boldText xpl-fieldSeparator"> {fieldName} </h6> 


                    {
                        // ? Check if the Field can be edited
                        // editField === true  && hideToggle === true &&
                        //     <Toggle
                        //         defaultChecked={false}
                        //         disabled = {!editField} 
                        //         checked = {isActive}
                        //         onChange = {props.onChange} 
                        //         name = {fieldName}
                        //         id = {`${fieldName}-${index}`}
                        //     />
                    }

                    {
                        // ? Check if the Field can be edited
                        editField === true  && !hideToggle &&
                            <Toggle
                                defaultChecked={isActive}
                                disabled = {!editField} 
                                checked = {isActive}
                                onChange = {props.onChange} 
                                name = {fieldName}
                                id = {`${fieldName}-${index}`}
                            />
                    }

                    {
                        editField === false && fieldValue !== "" && 
                            <Toggle
                                defaultChecked={isActive}
                                disabled = {!editField} 
                                checked = {isActive}
                                onChange = {props.onChange} 
                                name = {fieldName}
                                id = {`${fieldName}-${index}`}
                            />
                    }
                    
                    { /*<span className='label-text'> {! fieldValue ? 'N' : fieldValue }  </span> */}
                </div>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ToggleField.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default ToggleField;