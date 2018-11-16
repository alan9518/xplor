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
    import { Breadcumbs, WideCard, ProjectCard, TabsLayout } from '../../components';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class DetailsView extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    tabIndex : 0,
                    productDetails: [
                        { id : '1', title : 'Tab 1', content: {} },
                        { id : '2', title : 'Tab 2', content: {} },
                        { id : '3', title : 'Tab 3', content: {} },
                        { id : '4', title : 'Tab 4', content: {} },
                        { id : '5', title : 'Tab 5', content: {} },
                        { id : '6', title : 'Tab 6', content: {} },
                    
                    ]
                }
            }


        /* ==========================================================================
         * State & Logic Functions
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
                const {productDetails, tabIndex}  = this.state;
                return (
                    
                    <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                        <TabsLayout 
                            tabsData = {productDetails} 
                            defaultIndex = {tabIndex} 
                            onSelect={tabIndex => this.setState({ tabIndex })}
                        >
                            <WideCard  tabIndex = {tabIndex}/>
                        </TabsLayout>
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

                                    <div className="col-lg-3 col-md-12 col-sm-12">
                                        <div className="xpl-relatedListApps">
                                        <h5>Related Products</h5>
                                           <div className="xpl-relatedContainer">
                                                <ProjectCard/>
                                                <ProjectCard/>
                                                <ProjectCard/>
                                            </div>
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
