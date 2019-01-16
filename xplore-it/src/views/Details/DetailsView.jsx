/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard,WideCard,CardHeaderWide, FieldsMaker} from '../../components';
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
				console.log("​DetailsView -> constructor -> props", props)
                this.state = {
                    tabIndex : 0,
                    productTabs: [],
                    currentTab : 0,
                    relatedProducts : [],
                    productOverview:{},
                    productDetails : {},
                    isLoaded : false,
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

                    // Project Details
                    const productDetails = await this.loadProductOverview();


                    // Get Search Terms 
                    let searchTerms = productDetails.SearchKeyword;

                    // Get Related Projects
                    let reladtedProducts = await this.loadRelatedProducts(searchTerms);
                    let reladtedProducts2 = await this.loadRelatedProducts2(searchTerms);
					
                    console.log("​DetailsView -> loadAPI -> reladtedProducts", reladtedProducts)

                    console.log("​DetailsView -> loadAPI -> reladtedProducts2", reladtedProducts2)

                    // Get All Tabs
                    const productTabs =  await this.loadProductTabs();

                    // Get Attr for First Tab
                    const tabAttributes = await this.loadTabAttributes(3095);

                    // Store Values
                    this.setState({
                        productTabs : productTabs,
                        productDetails : productDetails,
                        relatedProducts : reladtedProducts,
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
                const relatedProjectsPromise = await (axios.get(Endpoints.getRelatedProducts, {params}));
                const relatedProjectsData =  await relatedProjectsPromise.data;

                return relatedProjectsData;
            }


            /** --------------------------------------
            // Get Related Projects Hardcoded
            // @param {partID <integer>}
            // @param {Produt search keywords <string array>}
            // @returns {A Promise Object}
            // --------------------------------------*/

            async loadRelatedProducts2(productKeywords) {
				console.log("​DetailsView -> loadRelatedProducts -> productKeywords", productKeywords)
        
                const relatedProjectsPromise = await (axios.get(Endpoints.getRelatedProductsHard));
                const relatedProjectsData =  await relatedProjectsPromise.data;

                return relatedProjectsData;
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



