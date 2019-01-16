/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard,WideCard,CardHeaderWide, FieldsMaker, NoData} from '../../components';
    import axios from 'axios';
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
                    productTabs: [],
                    currentTab : 0,
                    relatedProducts : [],
                    productOverview:{},
                    productDetails : {},
                    isLoaded : false,
                    showError : false,
                    tabLoading : false,
                }
                this.partID = props.match.params.partID;
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
            // Get All Calls
            // --------------------------------------
            async loadAPI () {
                try {

                    // Get Product Main Data
                        const productDetails = await this.loadProductOverview();

                    // Get Search Terms 
                        const searchTerms = productDetails.SearchKeyword;


                    // Create Promises that can run in parallel
                        const relatedProductsPromise = this.loadRelatedProducts(searchTerms);
                        const relatedProductsPromise2 = this.loadRelatedProducts2(searchTerms);
                        const productTabsPromise =  this.loadProductTabs();

                    // Resolve Promises
                    // Execute Parallel Promises
                        const [productTabsData, relatedProductsData, relatedProductsData2] =  await Promise.all([productTabsPromise, relatedProductsPromise, relatedProductsPromise2]);
						
                        console.log("​DetailsView -> loadAPI -> relatedProductsData2", relatedProductsData2)

                    // Get Attr for First Tab
                        const firstTab =  productTabsData.data[0].BusinessTypeID;
                        const tabAttributes = await this.loadTabAttributes(firstTab);
                


                    // Store Values
                    this.setState({
                        productTabs : productTabsData.data,
                        productDetails : productDetails,
                        relatedProducts : relatedProductsData.data,
                        productOverview : tabAttributes,
                        isLoaded : true
                    })
                }
                catch (error) {
                    console.log('error', error);
                    this.setState({
                        productTabs : [],
                        productDetails : {},
                        relatedProducts : [],
                        productOverview : {},
                        showError : true,
                        isLoaded : true
                    })
                }
            
            }





            /** --------------------------------------
            // Get Project Overview
            // @param {partID <integer>}
            // @returns {A Promise Object}
            // --------------------------------------*/
            async loadProductOverview() {
                const params = {partid : this.partID}
                const loadProjectOverviewPromise = await axios.get(Endpoints.getProduct, {params});
                const projectOverviewData = await loadProjectOverviewPromise.data[0];
                return projectOverviewData;
            }


            /** --------------------------------------
            // Get Related Projects
            // @param {partID <integer>}
            // @param {Produt search keywords <string array>}
            // @returns {A Promise Object}
            // --------------------------------------*/
            async loadRelatedProducts(productKeywords) {
				console.log("​DetailsView -> loadRelatedProducts -> productKeywords", productKeywords)
                
                const params = {
                    customerid : this.partID,
                    keyword : productKeywords,
                }
                

                return (axios.get(Endpoints.getRelatedProducts, {params}));
            }



            /** --------------------------------------
            // Get Related Projects Hardcoded
            // @param {partID <integer>}
            // @param {Produt search keywords <string array>}
            // @returns {A Promise Object}
            // --------------------------------------*/

            async loadRelatedProducts2(productKeywords) {
				
                return axios.get(Endpoints.getRelatedProductsHard)
            }


            
            // --------------------------------------
            // Get Product Tabs
            // --------------------------------------
            async loadProductTabs() {
                return axios.get(Endpoints.getProductTabs);
            }
        

            /** --------------------------------------
            // Get Tab Attributes
            // @param {partid}
            // @param {busstypeid}
            // --------------------------------------
            **/
            async loadTabAttributes(busstypeid) {

                const params = {partid : this.partID, busstypeid : busstypeid}
                const tabsDataAttrPromise = await axios.get(Endpoints.getTabAttributes, {params});                
                const tabsAttrData = await tabsDataAttrPromise.data;
                return tabsAttrData;


            }

            
            /** --------------------------------------
            // Get Tab Attributes When Tab Changes
            // @param {partid}
            // @param {busstypeid}
            // --------------------------------------
            **/
            async changeTabData (businessID) {
                const newTabData = await  this.loadTabAttributes(businessID); 
				console.log("​DetailsView -> changeTabData -> newTabData", newTabData)
                this.setState({
                    productOverview : newTabData,
                    tabLoading : false
                })

            }



        /* ==========================================================================
         * State & Logic Functions
        ========================================================================== */

            // --------------------------------------
            // Change Tab and Get Business ID
            // --------------------------------------
            onTabChange = (businessID) =>  {
                this.setState({tabLoading: true})
                this.changeTabData(businessID)
            }   

            onBreadCumbsCatClick = (event) => {
                console.log('DV props', this.props);
                this.props.history.goBack();
            }


            



        /* ==========================================================================
         * Render Methods
        ========================================================================== */

            
            // --------------------------------------
            // Render BreadCumbs
            // TODO : Add Category ID To Breadcumbs
            // --------------------------------------
            renderBreadcumbs() {
                const {SoftwareTopic, ProductName, partID} = this.state.productDetails;
				console.log("​DetailsView -> renderBreadcumbs -> this.state.productDetails", this.state.productDetails)
                return <Breadcumbs softwareTopic = {SoftwareTopic} productName = {ProductName}    onClick = {this.onBreadCumbsCatClick}/>
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
                            relatedProducts && relatedProducts.map(product => (
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
                return <div> <AppLoader customHeight = {800}/> </div>
            }


            // --------------------------------------
            // Render Error Page
            // --------------------------------------
            renderErrorPage() {
                return(
                    <div>
                        <NoData message = {"We Can't Connect to the Server. Please Try Again Later"}/>
                    </div>
                )
            }




            // --------------------------------------
            // Render Tab Content
            // --------------------------------------            
            renderProductDetails() {
                const {productTabs, productOverview, tabLoading} = this.state;
                // const fieldsMakerComponent =  <FieldsMaker formFields = {productOverview}/>
                return (
                    <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                        <CustomTabs tabLoading = {tabLoading} tabsData = {productTabs} onTabChange = {this.onTabChange}>
                            <WideCard  >
                                
                                <PanelContent tabLoading = {tabLoading} panelTabContent = {productOverview}  /> 
                    
                            </WideCard>
                        </CustomTabs>
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

            // --------------------------------------
            // Render View Body
            // --------------------------------------
            renderAppDetailsViewContainer () {
                return (
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
                )
            }

            // --------------------------------------
            // Render View Look for an Error
            // --------------------------------------
            renderAppDetailsView() {
                const {showError}  = this.state;
                return (

                    <Fragment>
                        {showError === true ? this.renderErrorPage(): this.renderAppDetailsViewContainer()}
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



