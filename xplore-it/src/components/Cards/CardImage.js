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
    // Check if the icon Name already has
    // Fa 
    // --------------------------------------
    const checkIconName = (iconClassName)=> {
        if(iconClassName.indexOf('fa-') >= 0){
            let iconNameArray = iconClassName.split('fa-');
            return iconNameArray[iconNameArray.length-1];
        }
        else
            return iconClassName

    }

    // --------------------------------------
    // Create Component
    // --------------------------------------   
        const CardImage = (props) => {
            const {projectIcon} =  props;
            
            const iconName = (projectIcon === 'Default' || projectIcon === '' ?  'laptop-code' : projectIcon).toLowerCase().replace(' ','');
            return( 
                    <div className="xpl-cardImage">
                        <i className={`fas fa-${checkIconName(iconName)}`}></i>
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
