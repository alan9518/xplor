/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
import React, { Component, Fragment } from "react";
import { Breadcumbs, WideCard, ProjectCard, TabsLayout, AppLoader, CardHeaderWide, CardTabContent  } from '../../components';
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
                productTabs: [],
                currentTab : 0,
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

        // --------------------------------------
        // Will cause component to never re-render
        // --------------------------------------
        // shouldComponentUpdate() {
        //     return false; 
        // }


    /* ==========================================================================
     *  API Calls
     ========================================================================== */

        // --------------------------------------
        // Load Web Services
        // --------------------------------------

        async loadAPI() {
            const {partID} =  this.props.match.params;
            // Load Tabs
                const productTabs =  await this.loadProductTabs();
                console.log('productTabs', productTabs);

            // Load Product Core Attributes
                const productOverview =  await this.loadProductOverview(partID);
                console.log('productOverview', productOverview);


            // Store Values
                this.setState({
                    productTabs : productTabs,
                    productOverview : productOverview,
                    isLoaded : true
                })

        }







        // async loadAPI () {
        //     const {partID} =  this.props.match.params;
            
        //     // Project Details
        //     let loadProjectOverviewPromise = await this.loadProductOverview(partID);
        //     let projectOverviewResponse = await loadProjectOverviewPromise.data[0];

        //     // Get Keywords
        //     let productKeywords = projectOverviewResponse.SearchKeyword

        //     // Get Related Projects
        //     let loadRelatedProjectsPromise = await this.loadRelatedProjects(partID,productKeywords);
        //     let relatedProjectsResponse = await loadRelatedProjectsPromise.data;


        //     this.setState( {
        //         productOverview : projectOverviewResponse,
        //         relatedProducts : relatedProjectsResponse,
        //         isLoaded : true
        //     })

        // }


        /** --------------------------------------
        // Load Product Tabs
        // @param {}
        // @returns {An array with Tabs Data}
        // --------------------------------------*/
        async loadProductTabs() {
            const tabsDataPromise = await axios.get(Endpoints.getProductTabs);
            const tabsData =  await tabsDataPromise.data;

            return tabsData;
        }


        /** --------------------------------------
        // Load Product Tabs Content
        // @param {partId}
        // @returns {An array with Tabs Data}
        // --------------------------------------*/
        async loadProductTabsContent() {
            const tabsDataContentPromise = await axios.get(Endpoints.getTabAttributes);
            const tabsDataContent =  await tabsDataContentPromise.data;
            console.log('tabsDataContent', tabsDataContent);

            return tabsDataContent;
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
        async loadProductOverview(partID) {
            const params = {partid : partID}
            const loadProjectOverviewPromise = await axios.get(Endpoints.getProduct, {params});
            console.log('loadProjectOverviewPromise', loadProjectOverviewPromise);
            const projectOverviewData = await loadProjectOverviewPromise.data[0];
            return projectOverviewData;
        }



    /* ==========================================================================
     * State & Logic Functions
    ========================================================================== */

        // --------------------------------------
        // Change To Previous Tab 
        // --------------------------------------

        changePrevTab = (e) => {
            const {tabIndex} =  this.state;
            tabIndex <= 1 
                ? this.setState({tabIndex : 0 })
                : this.setState({tabIndex : tabIndex - 1})
        }

        // --------------------------------------
        // Change to Next Tab 
        // --------------------------------------
        changeNextTab = (e) =>{
            const {tabIndex, productTabs} =  this.state;
            tabIndex < productTabs.length - 1
                ? this.setState({tabIndex : tabIndex + 1})
                : this.setState({tabIndex : 0 })
        }


        onSelectTab = (tabIndex) => {
            this.setState({ tabIndex })
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
        // Render Tab Details
        // --------------------------------------
        renderProductDetails() {
            const {productTabs, tabIndex, productOverview} =  this.state;

            // Render Tabs
            return (
                <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                    <TabsLayout  
                        tabsData = {productTabs} 
                        // onSelect = {tabIndex => this.setState({ tabIndex })}
                        onSelect = {this.onSelectTab}
                        changeNextTab = {this.changeNextTab}
                        changePrevTab = {this.changePrevTab}
                        currentTab = {tabIndex}
                        
                    >

                        {
                            // Render First the Overview
                            tabIndex === 0 ? this.renderProjectOverview(productOverview) : this.renderTabContent(productOverview)
                        }
                        
                    </TabsLayout>

                </div>
            )

        }


        /** --------------------------------------
        // Render Project Overview
        // @param {productOverview <Object>}
        // @returns {WideCard View <Component>}
        // --------------------------------------*/
        renderProjectOverview(productOverview) {
            return (
                <WideCard  
                    productData = {productOverview} 
                    isOveview = {true} >

                <CardHeaderWide productOverview = {productOverview} />  
                
            </WideCard>
            )    
        }




        /** --------------------------------------
        // Render tab Content
        // @param {productOverview <Object>}
        // @returns {TabContentCard View <Component>}
        // --------------------------------------*/
        renderTabContent(productOverview) {
            console.log('Tab Content', productOverview)
            return (

                <WideCard  >

                    <div> Tab Details  </div>
                    
                </WideCard>
                
                


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
                        
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-9 col-sm-12">
                                    {this.renderBreadcumbs()}
                                    {this.renderProductDetails()}
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
// Export Component
// --------------------------------------
export default DetailsView;
