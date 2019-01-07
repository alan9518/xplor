/* ==========================================================================
 * Project Image Component 
 * 06/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Component
// --------------------------------------   
    const CardImage = (props) => {
        const {projectIcon} =  props;
        const iconName = (projectIcon === 'Default' || projectIcon === '' ?  'file' : projectIcon).toLowerCase();
        return( 
                <div className="xpl-cardImage">
                    <i className={`fas fa-${iconName}`}></i>
                </div>
        )
    } 


// --------------------------------------
// PropTypes
// --------------------------------------
    CardImage.propTypes = {
        projectIcon : PropTypes.string
    }

    CardImage.defaultProps = {
        projectIcon : 'file'
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default CardImage;
