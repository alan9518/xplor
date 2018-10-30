/* ==========================================================================
 * Add New App Button on Content Header Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";

// --------------------------------------
// Create and Export Component
// --------------------------------------
    const HeaderButton = resourceMail => {
    
        return  (
            <div className="xpl-buttonContainer">
                <button className="xpl-button xpl-addNewAppButton">  
                    Add New Item 
                    <i className="fas fa-plus-circle"></i> 
                </button>
            </div>
        )
    };

// --------------------------------------
// Prop Types
// --------------------------------------
// HeaderButton.propTypes = {
//   resourceMail: PropTypes.object
// };

// --------------------------------------
// Export Component
// --------------------------------------
    export default HeaderButton;
