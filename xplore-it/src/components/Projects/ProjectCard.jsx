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

// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProjectCard extends Component {


        // --------------------------------------
        // Render Card
        // --------------------------------------
        renderCard() {
            return (
                <div className="xpl-cardContainer xpl-shadow">

                    <div className="xpl-cardHeader">
                        <div className="xpl-cardName"> <h5>App Name </h5></div>
                        <div className="xpl-cardImage">
                            <i className="fas fa-basketball-ball"></i>
                        </div>
                    </div>
                    <div className="xpl-cardDescription">
                        <p> lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

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
