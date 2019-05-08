/* ==========================================================================
** Icons Layout Grid Item 
** 03/05/2019
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
    const IconItem = (props) => {
        const {iconName} = props;
        return (
            <div className = "xpl-iconGridItem" >
                <button value = {iconName}  onClick = {props.onIconClick} name = {iconName} className = "xpl-iconButton">  
                    <i className = {iconName}  id = {iconName}>  </i>   
                </button>
            </div>
        )
    }
    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    IconItem.propTypes = {
        iconName: PropTypes.string
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default IconItem;