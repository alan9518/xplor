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
    import { Breadcumbs, WideCard, ProjectCard, TabsLayout, AppLoader  } from '../../components';
    import axios from 'axios';
    import {join} from 'lodash';
    import {Endpoints} from '../../services/endpoints'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class DetailsView extends Component {

        /* ==========================================================================
         *  Component Setup
         ========================================================================== */

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
                    ],
                    relatedProducts : [],
                    productOverview:{},
                    isLoaded : false,
                }
            }

            // --------------------------------------
            // Load API and Set State
            // --------------------------------------
            componentDidMount() {
                this.loadAPI();
            }

        /* ==========================================================================
         *  API Calls
         ========================================================================== */

            // --------------------------------------
            // Load Web Services
            // --------------------------------------
            async loadAPI () {
                const {partID} =  this.props.match.params;
                
                // Project Details
                let loadProjectOverviewPromise = await this.loadProjectDetails(partID);
                let projectOverviewResponse = await loadProjectOverviewPromise.data[0];

                // Get Keywords
                let productKeywords = projectOverviewResponse.SearchKeyword

                // Get Related Projects
                let loadRelatedProjectsPromise = await this.loadRelatedProjects(partID,productKeywords);
                let relatedProjectsResponse = await loadRelatedProjectsPromise.data;


                this.setState( {
                    productOverview : projectOverviewResponse,
                    relatedProducts : relatedProjectsResponse,
                    isLoaded : true
                })


            }

            /** --------------------------------------
            // Get Related Projects
            // @param {partID <integer>}
            // @param {Produt search keywords <string array>}
            // @returns {A Promise Object}
            // --------------------------------------*/
            async loadRelatedProjects(partID,productKeywords) {
                
                const params = {
                    customerid : partID,
                    keyword : join(productKeywords, ',')
                }
                return (axios.get(Endpoints.getRelatedProducts, {params}));
            }


            /** --------------------------------------
            // Get Project Overview
            // @param {partID <integer>}
            // @returns {A Promise Object}
            // --------------------------------------*/
            async loadProjectDetails(partID) {
                const params = {partid : partID}
                return (axios.get(Endpoints.getProduct, {params}));
            }

        /* ==========================================================================
         * State & Logic Functions
        ========================================================================== */

            // --------------------------------------
            // Change Current Tab 
            // --------------------------------------

            changePrevTab = (e) => {
                const {tabIndex} =  this.state;
                tabIndex <= 1 
                    ? this.setState({tabIndex : 0 })
                    : this.setState({tabIndex : tabIndex - 1})
            }

            changeNextTab = (e) =>{
                const {tabIndex, productDetails} =  this.state;
                tabIndex < productDetails.length - 1
                    ? this.setState({tabIndex : tabIndex + 1})
                    : this.setState({tabIndex : 0 })
            }

            



        /* ==========================================================================
         * Render Methods
        ========================================================================== */

            // --------------------------------------
            // Render BreadCumbs
            // --------------------------------------
            renderBreadcumbs() {
                const {SoftwareTopic, ProductScope} = this.state.productOverview;
                    return <Breadcumbs SoftwareTopic = {SoftwareTopic}  />
                }

            // --------------------------------------
            // Render Details Body
            // --------------------------------------
            renderDetailsBody() {
                const {productDetails, tabIndex, productOverview}  = this.state;
                return (
                    
                    <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                        <TabsLayout 
                            tabsData = {productDetails} 
                            onSelect={tabIndex => this.setState({ tabIndex })}
                            changeNextTab = {this.changeNextTab}
                            changePrevTab = {this.changePrevTab}
                        >
                            <WideCard productData = {productOverview} isOverview = {true} tabIndex = {tabIndex}/>
                        </TabsLayout>


                    </div>
                )
            }


            // --------------------------------------
            // Render Related Projects
            // --------------------------------------
            renderRelatedProducts() {
                const {relatedProducts}  = this.state;
                return (
                    <Fragment>
                        <div className="xpl-relatedContainer">
                        {
                            relatedProducts.map(product => (
                                <ProjectCard key = {product.partID} hasSmallDescription={true} {...product}/>
                            ))
                        }
                        </div>
                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader/> </div>
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
                                            {this.renderRelatedProducts()}
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
                    const {isLoaded} = this.state;
                    return isLoaded ? this.renderAppDetailsView() : this.renderLoader();
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
