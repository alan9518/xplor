/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard,WideCard,CardHeaderWide, NoData} from '../../components';
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
                        const [productTabsData, relatedProducts, relatedProducts2, SPColorsCategories] =  await Promise.all([productTabsPromise, relatedProductsPromise, relatedProductsPromise2, this.loadSPCategories()]);
                        console.log('​DetailsView -> loadAPI -> SPColorsCategories', SPColorsCategories)
                        

                    // Get Related Products With its Colors
                        const relatedProductsData =  this.mergeProductsAndColors(relatedProducts2.data, SPColorsCategories);
						console.log('​DetailsView -> loadAPI -> relatedProductsData', relatedProductsData)

                    // Add Static Tab 0 With Product Overview

                        const tab0 = { "BusinessTypeID": 0, "BusinessTypeName": "Product Overview", "Sequence": 0};
						

                    // Get Attr for First Tab
                        // const firstTab =  productTabsData.data[0].BusinessTypeID;
                        const firstTab =  tab0.BusinessTypeID;
                        // const tabAttributes = await this.loadTabAttributes(firstTab);
                    
                    // Add Static Tab to The ones that come from API
                        const tabsHeaderList = [tab0, ...productTabsData.data];
						console.log('​DetailsView -> loadAPI -> tabsHeaderList', tabsHeaderList)

                    // Store Values
                    this.setState({
                        productTabs : tabsHeaderList,
                        productDetails : productDetails,
                        relatedProducts : relatedProductsData,
                        // productOverview : tabAttributes,
                        productOverview : [],
                        isLoaded : true
                    });
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

            /** --------------------------------------
            // Get Colors From Sharepoint 
            // @returns {A new Array With Only Color & Name Values from Response}
            // --------------------------------------*/
            async loadSPCategories() {
                const getSPCategoriesPromise = await axios.get(Endpoints.getSideBarCategoriesSP)
                const getSPCategoriesResponse =  await getSPCategoriesPromise.data.value;
                const SPCatsArray = (getSPCategoriesResponse.map((SpCat)=> {
                    return {
                        color : SpCat.Color,
                        name : SpCat.Title,
                    }
                }));
                

                return (SPCatsArray);
            }


            /** --------------------------------------
            // Merge Reponse From API & SP
            // Based on Category Name
            // @param {productsData <API data>}
            // @param {SPColorsCategories <SP data>}
            // @returns {A new Array With Category Colors}
            // --------------------------------------*/
            mergeProductsAndColors(productsData, SPColorsCategories) {
                const productsWithColor = productsData.map((product)=> {
                    for (let spColor of SPColorsCategories) {
                        if(product.SoftwareTopic === spColor.name) {
                            product.color = spColor.color
                        }
                    }
                    return product;
                })

                return productsWithColor;
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
                const {productDetails} = this.state;
                const newTabData = businessID === 0 ? productDetails : await this.loadTabAttributes(businessID); 
				console.log('​DetailsView -> changeTabData -> businessID', businessID)
				console.log("​DetailsView -> changeTabData -> newTabData", newTabData)
                this.setState({
                    productOverview : newTabData,
                    tabLoading : false,
                    currentTab : businessID
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
                const {SoftwareTopic, ProductName, SoftwareTopicID} = this.state.productDetails;
				console.log("​DetailsView -> renderBreadcumbs -> this.state.productDetails", this.state.productDetails)
                return <Breadcumbs softwareTopic = {SoftwareTopic} softwareTopicID = {SoftwareTopicID} productName = {ProductName}    onClick = {this.onBreadCumbsCatClick}/>
            }

            // --------------------------------------
            // Render Related Projects
            // --------------------------------------
            renderRelatedProducts() {
                const {relatedProducts}  = this.state;
                return (
                    <Fragment>
                        <div className="xpl-relatedContainer">
                            <div className="row">
                                {

                                    relatedProducts && relatedProducts.map((product) => {
                                        return (

                                                <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 ">
                                                    {/* <ProjectCard key = {product.partID} hasSmallDescription={true} {...product}/> */}
                                                    <ProjectCard 
                                                        key = {product.partID} 
                                                        hasSmallDescription={true}  
                                                        projectColor = {product.color}
                                                        onClick = {this.getCategoryID}
                                                        {...product}
                                                    />
                                                </div>
                                        )
                                    })

                                }
                            </div>
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
                        <NoData message = {"We Can't Connect to the Server."}/>
                    </div>
                )
            }




            // --------------------------------------
            // Render Tab Content
            // --------------------------------------            
            renderProductDetails() {
                const {productTabs, productOverview, tabLoading, productDetails, currentTab} = this.state;
                // const tabCeroContent = <CardHeaderWide productOverview = {productDetails} />  ;

                return (
                    <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                        <CustomTabs tabLoading = {tabLoading} tabsData = {productTabs} onTabChange = {this.onTabChange}>
                            <WideCard  >
                                
                                <PanelContent tabLoading = {tabLoading} panelTabContent = {productOverview}  tabCeroContent = {productDetails} currentTab = {currentTab}/> 
                    
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
            renderProjectOverview() {
                const {productDetails} = this.state;
                return (
                    <WideCard  
                        productData = {productDetails} 
                        isOveview = {true} >

                    <CardHeaderWide productOverview = {productDetails} />  
                    
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
                            <div className="col-xl-9 col-lg-12 col-sm-12">
                                {this.renderBreadcumbs()}
                                {this.renderProductDetails()}
                                
                            </div>

                            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
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



