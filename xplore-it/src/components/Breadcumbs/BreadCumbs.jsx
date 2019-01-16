/* ==========================================================================
 * BreadCumbs Component For Site Navigation 
 * 06/11/2018
 * Alan Medina Silva
 ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import {ProjectLink} from '../../components';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const BreadCumbs = (props) => {

        const {productName, softwareTopic , onClick} = props;

        return (
            <div className="xpl-breadcumbsContainer">
                <div className="xpl-breadLinksContainer">
                    <ProjectLink route = {"catalogue/all/all"} spRoute = {true}> 
                            <h4 className = "xpl-breadChild"> All Results  </h4> 
                    </ProjectLink>

                    <h4 class="xpl-breadChild" > 
                        <i class="fas fa-arrow-right xpl-breadSeparator"></i> 
                    </h4>

                    <h4 className = "xpl-breadChild" onClick = {onClick}>{ softwareTopic} </h4> 

                    <h4 class="xpl-breadChild" > <i class="fas fa-arrow-right xpl-breadSeparator"></i> </h4>

                    <h4 className = "xpl-breadChild"> {productName} </h4> 

                </div>
            </div>  
        )
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    BreadCumbs.propTypes = {
        productName: PropTypes.string,
        softwareTopic: PropTypes.string,
        onClick: PropTypes.func,
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default BreadCumbs;


    