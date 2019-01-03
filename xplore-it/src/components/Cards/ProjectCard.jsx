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
    import './styles.css';
    import { CardImage, ProjectLink } from '../../components';
    import { startCase } from "lodash";
    import {Config} from '../../Config'

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
            renderSmallDesc(ShortDescription, DetailedDescription) {
                // const cardDescription = ShortDescription || DetailedDescription;
                return (
                    <div className="xpl-cardDescription">
                        <p> {this.setDescriptionWidth(ShortDescription) } </p>
                    </div>
                )
            }


        /** --------------------------------------
        // Set Maximum Width for the Description
        // @param {projectDescription <string>}
        // @returns {Shortened Description}
        // --------------------------------------*/
            setDescriptionWidth(projectDescription) {
                if(projectDescription.length > 40)
                    return `${projectDescription.substr(0,39)}...`
                // else if (projectDescription)
                else
                    return projectDescription;
            }




        // --------------------------------------
        // Render Card
        // --------------------------------------
            renderCard() {
                // const {projectPath} =  Config;
                const {partID, ProductName, hasSmallDescription,projectColor, SoftwareTopic, ProductScope, ShortDescription, productIcon, DetailedDescription, cardHover } = this.props;
                const bgColor = hasSmallDescription ? projectColor : '#238ECC';
                const projectColorStyle = {backgroundColor : bgColor}

                return (
                    
                        <div className="xpl-cardContainer xpl-mediumCard xpl-shadow">
                            {/* <ProjectLink route = {`${projectPath}/${partID}`} > */}
                            <ProjectLink route = {partID} >
                                <div className = {`xpl-cardHeader ${cardHover && 'cardHover'}`} style = {projectColorStyle}>
                                    <div className="xpl-cardName"> 
                                        <h5> {ProductName} </h5> 
                                        <h5 className = {'xpl-productScopeCard'}> {ProductScope || SoftwareTopic} </h5>
                                    </div>
                                    <CardImage projectIcon = {productIcon}/>
                                </div>
                                {hasSmallDescription && this.renderSmallDesc(ShortDescription, DetailedDescription)}
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
        productIcon: PropTypes.string,
        DetailedDescription: PropTypes.string,
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectCard;


    