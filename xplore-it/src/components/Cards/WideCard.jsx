/* ==========================================================================
 * Wide Card Component For Details Page 
 * 06/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { CardImage } from '../../components';
    import './styles.css';

// --------------------------------------
// Create Component Class
// --------------------------------------
    
    const WideCard = (props) => {
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <div className="xpl-cardContainer xpl-wideCard  xpl-shadow">

                    <div className="xpl-cardWideHeader">
                        <div className="xpl-cardHeader">
                            <div className="xpl-cardName"> <h5>App Name </h5></div>
                            <CardImage/>
                        </div>
                        <div className="xpl-cardProjectInfo">
                            <p> Uploaded:  8/07/2018 </p>
                            <p> Contributor: Nader </p>
                            <p> Contact: Nader@flex.com  </p>
                        </div>
                    </div>


                    <div className="xpl-cardOverviewContainer">

                        <h5> Overview  </h5>


                        <p className="xpl-cardProjectCardOverview">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                        </p>

                    </div>
                </div>
            )
        
    }





// --------------------------------------
// Define PropTypes
// --------------------------------------
    // WideCard.propTypes = {
    //     prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default WideCard;    
