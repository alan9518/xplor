/* ==========================================================================
 * Custom Loader Component
 * Using react-loader-spinner
 * 30/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import Loader from 'react-loader-spinner';
    import './styles.css';

// --------------------------------------
// Create Component
// --------------------------------------    
    const Apploader = () => {  
        return (
            <div className="xpl-loaderContainer">
                <div className="xpl-loaderHolder">
                    <Loader
                        type = "Ball-Triangle"
                        color = "#1197D3"
                        height = {80}
                        width = {80}
                    ></Loader>
                </div>
           </div>
        )
    }   


// --------------------------------------
// Export Component
// --------------------------------------
    export default Apploader;