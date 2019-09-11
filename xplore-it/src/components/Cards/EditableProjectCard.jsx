/* ==========================================================================
 * Project Card Container Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";
    import { CardImage } from '../../components';
    import './styles.css';




// --------------------------------------
// Create Functional Component
// --------------------------------------
    const EditableProjectCard = (props) => {
        
        // --------------------------------------
        // Get Props
        // --------------------------------------
        const {
            productName, projectColor,
            softwareTopic, cardHover, iconValue,
        } = props;


        // --------------------------------------
        // Remove Character from IconValue
        // --------------------------------------
        // const formatIconName = (iconName) =>{
        //     let newName = iconName !== '' ? iconName.substr(iconName.indexOf(':') + 1, iconName.length) : 'fas fa-laptop-code';

        //     return newName.trim();
        // }

        
        
        const bgColor = projectColor || '#238ECC';
        const projectColorStyle = { backgroundColor: bgColor }
        // const iconName = formatIconName(iconValue)


        return (

            <div className="xpl-cardContainer xpl-mediumCard xpl-shadow">
                
                
                    <div className={`xpl-cardHeader ${cardHover && 'cardHover'}`} style={projectColorStyle}>
                        <div className="xpl-cardName">
                            <h5> {productName} </h5>
                            <h5 className={'xpl-productScopeCard'}> {softwareTopic} </h5>
                        </div>
                        <CardImage projectIcon={iconValue} />
                    </div>
                    

                
            </div>
        )
    }



// --------------------------------------
// Default Props
// --------------------------------------
    EditableProjectCard.defaultProps = {
        projectColor: '#238ECC',
        cardHover: true,
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    EditableProjectCard.propTypes = {
        partID: PropTypes.number,
        cardHover: PropTypes.bool,
        ProductName: PropTypes.string,
        hasSmallDescription: PropTypes.bool,
        ProductScope: PropTypes.string,
        ShortDescription: PropTypes.string,
        IconValue: PropTypes.string,
        DetailedDescription: PropTypes.string,
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default EditableProjectCard;


