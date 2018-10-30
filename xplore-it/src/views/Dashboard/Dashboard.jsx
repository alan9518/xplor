/* ==========================================================================
 * Main Dashboard Template View
 * Add Here all the Components that will show on the main Panel
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import { HeaderButton, ToggleButton,  ProjectCard, Carrousel } from '../../components'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {


    // --------------------------------------
    // Render Body With Dummy Layout
    // --------------------------------------
    renderDummyBody() {
        return (
                <Fragment>
                    
                    <div className="row ">

                        <div className="col-lg-12">
                            <h2 className="xpl-row"> What's New?   </h2>
                                 <Carrousel/>
                        </div>
                    </div>



                    <div className="row xpl-row">

                        <div className="col-lg-12">
                            <h2> All Apps  </h2>
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
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard></ProjectCard>
                        </div>
                    </div>
                </Fragment>
        )
    }


    // --------------------------------------
    // Render Component
    // --------------------------------------
        render() {
            return (
                <div className="container-fluid">
                    <ToggleButton/>
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
