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
        return( 
                <div className="xpl-cardImage">
                    <i className={`${props.projectIcon}`}></i>
                </div>
        )
    } 


// --------------------------------------
// PropTypes
// --------------------------------------
    CardImage.propTypes = {
        imageSrc : PropTypes.string
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default CardImage;
