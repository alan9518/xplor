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
        return (
            <div className="xpl-breadcumbsContainer">

            <div className="row">
                    <div className="col-lg-2 col-sm-4">
                        <ProjectLink route = {"catalogue/all/all"} spRoute = {true}> 
                            <h4 className = "xpl-breadChild"> All Results  <i className="fas fa-arrow-right xpl-breadSeparator"></i> </h4> 
                        </ProjectLink>
                    </div>

                    <div className="col-lg-4 col-sm-4"> 
                        <h4 className = "xpl-breadChild" onClick = {props.onClick}>{ props.softwareTopic}  <i className="fas fa-arrow-right xpl-breadSeparator"></i> </h4> 
                    </div>

                    <div className="col-lg-4 col-sm-4"> 
                        <h4 className = "xpl-breadChild"> {props.productName} </h4> 
                    </div>
                </div>  
            </div>  
        )

    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default BreadCumbs;


    