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
    const BreadCumbs = ({SoftwareTopic, ProductScope}) => {

        return (
            <div className="xpl-breadcumbsContainer">
                <ProjectLink route = {"/catalogue"}>
                    <h4 className = "xpl-breadChild"> All Results  </h4>
                </ProjectLink>
                <h4 className = "xpl-breadChild"> > </h4>
                <ProjectLink route = {`/catalogue/${SoftwareTopic}`} >
                    <h4 className = "xpl-breadChild">{ SoftwareTopic} </h4>
                </ProjectLink>
               
            </div>
        )

    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default BreadCumbs;