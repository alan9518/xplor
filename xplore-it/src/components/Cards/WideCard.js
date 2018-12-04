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
    import { CardHeaderWide } from '../../components';
    import './styles.css';

// --------------------------------------
// Create Component 
// --------------------------------------
    
    const WideCard = (props) => {
        console.log('props widecard', props);
        
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <div className="xpl-cardContainer xpl-wideCard ">
                    
                   {props.cardHeader}

                    <div className="xpl-cardOverviewContainer">

                        <h5> Overview  </h5>

                        {props.tabIndex}


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
