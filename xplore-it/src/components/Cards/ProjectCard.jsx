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
        // Render Small Description
        // --------------------------------------
            renderSmallDesc() {
                return (
                    <div className="xpl-cardDescription">
                        <p> lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                )
            }


        // --------------------------------------
        // Render Card
        // --------------------------------------
            renderCard() {
                const {path,projectPath} =  Config
                console.log('projectPath', projectPath);
                return (
                    
                        <div className="xpl-cardContainer xpl-mediumCard xpl-shadow">
                            <ProjectLink route = {`${projectPath}/2`} >
                                <div className="xpl-cardHeader">
                                    <div className="xpl-cardName"> <h5>App Name </h5> </div>
                                    <CardImage/>
                                </div>
                                {this.props.hasSmallDescription && this.renderSmallDesc()}
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
