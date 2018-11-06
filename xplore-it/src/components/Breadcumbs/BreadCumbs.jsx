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


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const BreadCumbs = (props) => {

        return (
            <div className="xpl-breadcumbsContainer">
                <h4 className = "xpl-breadChild"> All Results  </h4> 
                <h4 className = "xpl-breadChild"> > </h4>
                <h4 className = "xpl-breadChild"> App Name  </h4>
            </div>
        )

    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default BreadCumbs;