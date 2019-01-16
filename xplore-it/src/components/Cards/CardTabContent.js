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

    const CardTabContent = (props) => {
        
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <div className="xpl-cardContainer xpl-wideCard ">
                    

                    <div className="xpl-cardOverviewContainer">


                        {props.children}


                        <p className="xpl-cardProjectCardOverview">
                        </p>

                    </div>
                </div>
            )
        
    }





// --------------------------------------
// Define PropTypes
// --------------------------------------
    CardTabContent.propTypes = {
        children: PropTypes.any
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default CardTabContent;    
