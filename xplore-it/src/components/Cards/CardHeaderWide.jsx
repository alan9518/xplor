/* ==========================================================================
 * Header Of Wide Card
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { CardImage } from "../../components";
    import "./styles.css";

// --------------------------------------
// Create Component Class
// --------------------------------------

    const CardHeaderWide = props => {
        
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <div className="xpl-cardWideHeader">
                    <div className="xpl-cardHeader">
                        <div className="xpl-cardName"> 
                            <h5>App Name </h5>
                        </div>
                        <CardImage/>
                    </div>
                    <div className="xpl-cardProjectInfo">
                        <p> Uploaded:  8/07/2018 </p>
                        <p> Contributor: Nader </p>
                        <p> Contact: Nader@flex.com  </p>
                    </div>
                </div>

                
            );
    };

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // CardHeaderWide.propTypes = {
    //     prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default CardHeaderWide;
