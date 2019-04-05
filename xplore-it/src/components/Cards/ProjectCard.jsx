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
    import ReactTooltip from 'react-tooltip'
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
            renderSmallDesc(ShortDescription, DetailedDescription,ProductName) {
                // const cardDescription = ShortDescription || DetailedDescription;
                return (
                    <div className="xpl-cardDescription">
                        {this.setDescriptionWidth(ShortDescription,ProductName) } 
                    </div>
                )
            }


        /** --------------------------------------
        // Set Maximum Width for the Description
        // @param {projectDescription <string>}
        // @returns {Shortened Description}
        // --------------------------------------*/
            setDescriptionWidth(projectDescription,ProductName) {
                if(projectDescription.length > 100) {
                     // return `${projectDescription.substr(0,100)}`
                    //  let toolTip =  <ToolTip tipText={projectDescription} isButton={false} />
                     
                     return (
                         <p data-tip = {projectDescription} data-for = {`tip-${ProductName}`}>  
                            {`${projectDescription.substr(0,100)} ...`} 
                            
                            <ReactTooltip 
                                className='xpl-toolTip' 
                                delayHide={1000} 
                                place = "top" 
                                type = "dark" 
                                effect="float"
                                id = {`tip-${ProductName}`}
                                border = {true}
                                style = {{border:'2px solid red'}}/> 
                        </p>
                    )
                }
                   

                // else if (projectDescription)
                else
                    return <p>{projectDescription}</p>   ;
            }



        // --------------------------------------
        // Remove Character from IconValue
        // --------------------------------------
        formatIconName(iconName) {
            let newName = iconName.substr(iconName.indexOf(':') + 1, iconName.length);

            return newName.trim();
        }




        // --------------------------------------
        // Render Card
        // --------------------------------------
            renderCard() {
                // const {projectPath} =  Config;
                const {
                        partID, ProductName, hasSmallDescription,projectColor, 
                        SoftwareTopic, ProductScope, ShortDescription, 
                        DetailedDescription, cardHover, IconValue, 
                } = this.props;
				console.log("TCL: ProjectCard -> renderCard -> this.props", this.props)
                // const bgColor = hasSmallDescription ? projectColor : '#238ECC';
                const bgColor =  projectColor ||  '#238ECC';
                const projectColorStyle = {backgroundColor : bgColor}
                const iconName =  this.formatIconName(IconValue)
                return (
                    
                        <div className="xpl-cardContainer xpl-mediumCard xpl-shadow">
                            {/* <ProjectLink route = {`${projectPath}/${partID}`} > */}
                            <ProjectLink route = {partID} >
                                <div className = {`xpl-cardHeader ${cardHover && 'cardHover'}`} style = {projectColorStyle}>
                                    <div className="xpl-cardName"> 
                                        <h5> {ProductName} </h5> 
                                        <h5 className = {'xpl-productScopeCard'}> {SoftwareTopic} </h5>
                                    </div>
                                    <CardImage projectIcon = {iconName}/>
                                </div>
                                {hasSmallDescription && this.renderSmallDesc(ShortDescription, DetailedDescription,ProductName) }
                                
                            </ProjectLink>
                        </div>
                )
            }
        

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderCard();
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


    