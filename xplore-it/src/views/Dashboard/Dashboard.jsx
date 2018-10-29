/* ==========================================================================
 * Main Dashboard Template View
 * Add Here all the Components that will show on the main Panel
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { HeaderButton, ProjectCard } from '../../components'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {


    // --------------------------------------
    // Render Body With Dummy Layout
    // --------------------------------------
    renderDummyBody() {
        return (
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <ProjectCard></ProjectCard>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <ProjectCard></ProjectCard>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <ProjectCard></ProjectCard>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <ProjectCard></ProjectCard>
                    </div>
                </div>
        )
    }


    // --------------------------------------
    // Render Component
    // --------------------------------------
        render() {
            return (
                <div className="container-fluid">
                    <HeaderButton/>
                    {/* <h1>Catalogue</h1> */}

                    {this.renderDummyBody()}

                </div>
            );
        }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;
