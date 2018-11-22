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
            renderSmallDesc(projectDescription) {
                
                return (
                    <div className="xpl-cardDescription">
                        <p> {projectDescription} </p>
                    </div>
                )
            }


        // --------------------------------------
        // Render Card
        // --------------------------------------
            renderCard() {
                const {projectPath} =  Config;
                const {projectID,projectTitle, projectCategory, projectLink, projectDescription } = this.props;
                return (
                    
                        <div className="xpl-cardContainer xpl-mediumCard xpl-shadow">
                            <ProjectLink route = {`${projectPath}/${projectID}`} >
                                <div className="xpl-cardHeader">
                                    <div className="xpl-cardName"> 
                                        <h5> {projectTitle} </h5> 
                                    </div>
                                    <CardImage/>
                                </div>
                                {this.props.hasSmallDescription && this.renderSmallDesc(projectDescription)}
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
    // ProjectCard.propTypes = {
    // prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectCard;
