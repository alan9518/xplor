/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import { Breadcumbs, WideCard, ProjectCard, TabsLayout, AppLoader, CardHeaderWide, CardTabContent  , CustomTabs} from '../../components';
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
            // Get All Calls
            // --------------------------------------
            async loadAPI () {
                try {
                     // Get ALl Tabs
                    const productTabs =  await this.loadProductTabs();
                    const tabAttributes = await this.loadTabAttributes(3095);
                    console.log('product Tabs', productTabs);

                    console.log('tabAttributess', tabAttributes);


                     // Store Values
                    this.setState({
                        productTabs : productTabs,
                        productOverview : tabAttributes,
                        isLoaded : true
                    })
                }

                catch (error) {
                    console.log('error');
                }
               
            }


            
            // --------------------------------------
            // Get Product Tabs
            // --------------------------------------
            async loadProductTabs() {
                const tabsDataPromise = await axios.get(Endpoints.getProductTabs);
                const tabsData =  await tabsDataPromise.data;
    
                return tabsData;
            }
        

            /** --------------------------------------
            // Get Tab Attributes
            // @param {partid}
            // @param {busstypeid}
            // --------------------------------------
            **/
            async loadTabAttributes(busstypeid) {

                

                const params = {partid : this.props.match.params.key, busstypeid : busstypeid}

                const tabsDataAttrPromise = await axios.get(Endpoints.getTabAttributes, {params});
                
                const tabsAttrData = await tabsDataAttrPromise.data;

                console.log('tab change', tabsAttrData);


                return tabsAttrData;


            }




        /* ==========================================================================
         * State & Logic Functions
        ========================================================================== */

            // --------------------------------------
            // Change Tab and Get Business ID
            // --------------------------------------
            onTabChange = (businessID)=>  {
                console.log(businessID);
                const newTab =  this.loadTabAttributes(businessID);
                console.log('tab change', newTab);

                // this.loadTabAttributes(businessID)
            }   


          
            



        /* ==========================================================================
         * Render Methods
        ========================================================================== */

            
            // --------------------------------------
            // Render BreadCumbs
            // --------------------------------------
            renderBreadcumbs() {
                // const {SoftwareTopic} = this.state.productOverview;
                return <Breadcumbs SoftwareTopic = {'SoftwareTopic'}  />
            }



            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader/> </div>
            }


            // --------------------------------------
            // Render Tab Content
            // --------------------------------------            
            renderProductDetails(productTabs) {
                return (
                    <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                        <CustomTabs tabsData = {productTabs} onTabChange = {this.onTabChange}/>
                    </div>
                )
            }


            // --------------------------------------
            // Render View
            // --------------------------------------
            renderAppDetailsView() {
                const {productTabs} = this.state;
                return (

                    <Fragment>
                        
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-9 col-sm-12">
                                    {this.renderBreadcumbs()}
                                    {this.renderProductDetails(productTabs)}
                                </div>

                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <div className="xpl-relatedListApps">
                                    <h5>Related Products</h5>
                                        {/* {this.renderRelatedProducts()} */}
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
