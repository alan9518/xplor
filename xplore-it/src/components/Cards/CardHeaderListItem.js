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
    const ListItem = ({itemName, content}) => {
        return (
                <li> 
                    <span className = "xpl-boldText"> 
                        {itemName}
                    </span> 
                    <span> {content} </span>
                </li> 
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


