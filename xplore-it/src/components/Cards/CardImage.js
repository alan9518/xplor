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
		console.log("TCL: CardImage -> projectIcon", projectIcon)
        const iconName = (projectIcon === 'Default' || projectIcon === '' ?  'laptop-code' : projectIcon).toLowerCase();
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
        projectIcon : 'laptop-code'
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default CardImage;
