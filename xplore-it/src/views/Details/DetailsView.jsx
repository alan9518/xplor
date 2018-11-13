/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import { Breadcumbs, WideCard, ProjectCard } from '../../components';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class DetailsView extends Component {


        /* ==========================================================================
         * Logic Methods
        ========================================================================== */




        /* ==========================================================================
         * Render Methods
        ========================================================================== */

            // --------------------------------------
            // Render BreadCumbs
            // --------------------------------------
                renderBreadcumbs() {
                    return <Breadcumbs/>
                }

            // --------------------------------------
            // Render Details Body
            // --------------------------------------
            renderDetailsBody() {
                return (
                    <div className="xpl-appDescriptionContainer">
                        <WideCard/>
                    </div>
                )
            }

            // --------------------------------------
            // Render View
            // --------------------------------------
                renderAppDetailsView() {
                    return (
                        <Fragment>
                            {this.renderBreadcumbs()}
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-9 col-sm-12">
                                        {this.renderDetailsBody()}
                                    </div>

                                    <div className="col-lg-3 col-sm-12">
                                        <div className="xpl-relatedListApps">
                                        <h5>Related Products</h5>
                                            <ProjectCard/>
                                            <ProjectCard/>
                                            <ProjectCard/>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </Fragment>
                    )
                }   


            // --------------------------------------
            // Render Component
            // --------------------------------------
                render() {
                    return this.renderAppDetailsView();
                }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // DetailsView.propTypes = {
    //     prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default DetailsView;