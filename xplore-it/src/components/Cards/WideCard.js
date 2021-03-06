/* ==========================================================================
 * Wide Card Component For Details Page 
 * 06/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";
    import './styles.css';

// --------------------------------------
// Create Component 
// --------------------------------------
    
    const WideCard = (props) => {
        
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <div className="xpl-cardContainer xpl-wideCard " >

                    {props.children}
                
                </div>
            )
        
    }





// --------------------------------------
// Define PropTypes
// --------------------------------------
    WideCard.propTypes = {
        children: PropTypes.any
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default WideCard;    
