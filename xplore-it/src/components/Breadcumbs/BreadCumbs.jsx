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
                <ProjectLink route = {"/catalogue"}>
                    <h4 className = "xpl-breadChild"> All Results  </h4>
                </ProjectLink>
                <h4 className = "xpl-breadChild"> > </h4>
                <h4 className = "xpl-breadChild"> App Name  </h4>
            </div>
        )

    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default BreadCumbs;