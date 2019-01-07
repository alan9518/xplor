/* ==========================================================================
 * Card Header List Item Markup 
 * 04/12/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React  from "react";
    import PropTypes from "prop-types";

// --------------------------------------
// Create Component
// --------------------------------------
    const ListItem = ({classNames,itemName, content}) => {
        return (
                <div className = {classNames}> 
                    <h6 className = "xpl-boldText"> {itemName} </h6> 
                    <span> {content} </span>
                </div> 
        )
    }


// --------------------------------------
// Component Props
// --------------------------------------
    ListItem.propTypes = {
        itemName : PropTypes.string,
        content : PropTypes.string
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default ListItem;


