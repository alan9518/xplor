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
    import {Config} from '../../Config'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProjectCard extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
            constructor(props) {
                super(props);
                
            }

        // --------------------------------------
        // Avoid Rerender of Cards each time 
        // a filter is activated
        // --------------------------------------
            shouldComponentUpdate() {
                return false; 
            }



        // --------------------------------------
        // Render Small Description
        // --------------------------------------
            renderSmallDesc(ShortDescription, DetailedDescription) {
                return (
                    <div className="xpl-cardDescription">
                        <p> {ShortDescription !== '' ? ShortDescription : DetailedDescription } </p>
                    </div>
                )
            }


        // --------------------------------------
        // Render Card
        // --------------------------------------
            renderCard() {
                const {projectPath} =  Config;
                const {partID, ProductName, hasSmallDescription, ProductScope, ShortDescription, productIcon, DetailedDescription } = this.props;
                const bgColor = hasSmallDescription ? this.props.projectColor : '#238ECC';
                const projectColorStyle = {
                    backgroundColor : bgColor
                }


                return (
                    
                        <div className="xpl-cardContainer xpl-mediumCard xpl-shadow">
                            <ProjectLink route = {`${projectPath}/${partID}`} >
                                <div className="xpl-cardHeader" style = {projectColorStyle}>
                                    <div className="xpl-cardName"> 
                                        <h5> {ProductName} </h5> 
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
// Define PropTypes
// --------------------------------------
    ProjectCard.propTypes = {
        partID: PropTypes.string,
        ProductName: PropTypes.string,
        hasSmallDescription: PropTypes.string,
        ProductScope: PropTypes.string,
        ShortDescription: PropTypes.string,
        productIcon: PropTypes.string,
        DetailedDescription: PropTypes.string,
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectCard;
