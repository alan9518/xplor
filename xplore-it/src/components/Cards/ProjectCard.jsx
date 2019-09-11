/* ==========================================================================
 * Project Card Container Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { CardImage, ProjectLink } from '../../components';
    import './styles.css';
  

// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProjectCard extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
            // constructor(props) {
            //     super(props);
            //     // this.state = {
            //     //     responsiveWidth : window.innerWidth,
            //     // }
                
            // }

        // --------------------------------------
        // Avoid Rerender of Cards each time 
        // a filter is activated
        // --------------------------------------
            shouldComponentUpdate() {
                return false; 
            }



        // --------------------------------------
        // Render Small Description
        // Choose between small Desc or normal 
        // --------------------------------------
            renderSmallDesc(ShortDescription, isCarrousel =  false) {
                

                return (
                    <div className = 'xpl-cardDescription'>
                    <p>  {this.setDescriptionWidth(ShortDescription, isCarrousel)} </p>
                    </div>
                )


                
            
            }


        /** --------------------------------------
        // Set Maximum Width for the Description
        // @param {projectDescription <string>}
        // @returns {Shortened Description}
        // --------------------------------------*/
            setDescriptionWidth(projectDescription, isCarrousel =  false) {

                if(isCarrousel)
                    return  <span style = {{textAlign : 'center'}}>{projectDescription}</span>
                
                if(projectDescription.length > 100) {
                    
                    return (
                        <div class="xpl-tooltip">
                            { `${projectDescription.substr(0,100)} ...`} 
                            <div class="top">
                                <p>{projectDescription}</p>
                            </div>
                        </div>

                    )

                }


                else
                    return <span> {projectDescription} </span>
            }



        // --------------------------------------
        // Remove Character from IconValue
        // --------------------------------------
        formatIconName(iconName) {
            
            if(iconName === "")
                return 'laptop-code'
            
            // if(typeof(iconName))

            let newName = iconName.substr(iconName.indexOf(':') + 1, iconName.length);
            return newName.trim();
        }



        // --------------------------------------
        // Get first St Value (Main one) 
        // --------------------------------------
        splitSoftwareTopic(softwareTopicValue) {
            if(!softwareTopicValue)
                return ""

            if(softwareTopicValue.indexOf(',') <= 0)
                return softwareTopicValue;
            
            let softwareTopicValueArray =  softwareTopicValue.split(',');
            let mainValue = softwareTopicValueArray[0] || '';

            return mainValue
        }




        // --------------------------------------
        // Render Card
        // --------------------------------------
            renderCard() {
                // const {projectPath} =  Config;
                const {
                        partID, ProductName, hasSmallDescription,projectColor, 
                        color, SoftwareTopic,  fullCard, ShortDescription, 
                         cardHover, IconValue, longCard, isCarrousel,CarouselDetails
                } = this.props;

                let showDescriptionBox = hasSmallDescription

                // ? Detect if show The carrousel Details
                if(isCarrousel)
                    showDescriptionBox =  true
                else
                    showDescriptionBox = hasSmallDescription
                

                // const bgColor = hasSmallDescription ? projectColor : '#238ECC';
                const bgColor = color ||  projectColor ||  '#238ECC';
                const projectColorStyle = {backgroundColor : bgColor}
                const iconName =  this.formatIconName(IconValue)

                const classNames = longCard === true ? 'xpl-cardContainer xpl-longCard xpl-shadow' : 'xpl-cardContainer xpl-mediumCard xpl-shadow'

                let cardNameStyles = {'width':'100%', 'textAllign':'center'}

                return (
                    
                        <div className = {classNames}>
                            {/* <ProjectLink route = {`${projectPath}/${partID}`} > */}
                            <ProjectLink route = {partID} >
                                <div className = {`xpl-cardHeader ${cardHover && 'cardHover'}  ${fullCard !== true && 'xpl-squareCard'}`} style = {projectColorStyle}>
                                    <div className="xpl-cardName"  > 
                                        <h5 style = {cardNameStyles}> {ProductName} </h5> 
                                        <h5 className = {'xpl-productScopeCard'}> {this.splitSoftwareTopic(SoftwareTopic)} </h5>
                                    </div>
                                    <CardImage projectIcon = {iconName}/>
                                </div>
                                { (showDescriptionBox && !isCarrousel) && this.renderSmallDesc(ShortDescription) }
                                { (showDescriptionBox && isCarrousel) && this.renderSmallDesc(CarouselDetails, true) }
                                
                            </ProjectLink>
                        </div>
                )
            }


            renderCardNoLink() {
                
                const {
                    ProductName, hasSmallDescription,projectColor, 
                    SoftwareTopic, fullCard, ShortDescription, 
                    DetailedDescription, cardHover, IconValue, longCard
                } = this.props;

                // const bgColor = hasSmallDescription ? projectColor : '#238ECC';
                const bgColor =  projectColor ||  '#238ECC';
                const projectColorStyle = {backgroundColor : bgColor}
                const iconName =  this.formatIconName(IconValue)

                const classNames = longCard === true ? 'xpl-cardContainer xpl-longCard xpl-shadow' : 'xpl-cardContainer xpl-mediumCard xpl-shadow'

                let cardNameStyles = {'width':'100%', 'textAllign':'center'}

                return (
                    
                        <div className = {classNames}>
                            
                            
                                <div className = {`xpl-cardHeader ${cardHover && 'cardHover'}  ${fullCard !== true && 'xpl-squareCard'}`} style = {projectColorStyle}>
                                    <div className="xpl-cardName"  > 
                                        <h5 style = {cardNameStyles}> {ProductName} </h5> 
                                        <h5 className = {'xpl-productScopeCard'}> {this.splitSoftwareTopic(SoftwareTopic)} </h5>
                                    </div>
                                    <CardImage projectIcon = {iconName}/>
                                </div>
                                {hasSmallDescription && this.renderSmallDesc(ShortDescription, DetailedDescription,ProductName) }
                        </div>
                )
            }
        

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            const {detailsViewCard} = this.props;

            return detailsViewCard === true ? this.renderCardNoLink() :  this.renderCard();
        }
    }

// --------------------------------------
// Default Props
// --------------------------------------
    ProjectCard.defaultProps = {
        projectColor : '#238ECC',
        cardHover : true,
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    ProjectCard.propTypes = {
        partID: PropTypes.number,
        cardHover : PropTypes.bool,
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
    export default ProjectCard;


