/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
import React, { Component, Fragment } from "react";
import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard,WideCard,CardHeaderWide, FieldsMaker, NoData,     } from '../../components';
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';
import axios from 'axios';
import {Endpoints} from '../../services/endpoints'
import moment from 'moment';

// --------------------------------------
// Create Component Class
// --------------------------------------
class DetailsView extends Component {

    /* ==========================================================================
    * //?Component Setup
    ========================================================================== */

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                responsiveWidth : window.innerWidth,
                productTabs: [],
                currentTab : 0,
                relatedProducts : [],
                productOverview:{},
                productDetails : {},
                currentTabName : '',
                editingContent : false,
                isLoaded : false,
                showError : false,
                tabLoading : false,
                userIsEditingTab : false
            }
            this.partID = props.match.params.partID;
            this.originalValues = null;
            // this.updateOverViewStatus =  this.updateOverViewStatus;
        }

        // --------------------------------------
        // Load API and Set State
        // --------------------------------------
        componentDidMount() {
            window.addEventListener("resize", this.updateContainerDimensions);
            this.loadAPI();
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateContainerDimensions);
        }




        // --------------------------------------
        // Window Resizing
        // --------------------------------------
        updateContainerDimensions = () => {
            let newWidth = window.innerWidth;
            this.setState({responsiveWidth : newWidth});
        }





    

    /* ==========================================================================
     * //?API Calls
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
                    const relatedProductsPromise = this.loadRelatedProducts(searchTerms, productDetails.SoftwareTopic);
                    
                    const productTabsPromise =  this.loadProductTabs();

                // Resolve Promises
                // Execute Parallel Promises
                    
                    const [productTabsData, relatedProducts,  SPColorsCategories] =  await Promise.all([productTabsPromise, relatedProductsPromise,  this.loadSPCategories()]);
                    
                    

                // Get Related Products With its Colors
                    const relatedProductsData =  this.mergeProductsAndColors(relatedProducts.data, SPColorsCategories);
                    
                    const productDetailsWithColor = this.mergeProductAndColors(productDetails, SPColorsCategories);
                    
                    
                
                // Add Static Tab 0 With Product Overview
                    const tab0 = { "BusinessTypeID": 0, "BusinessTypeName": "Product Overview", "Sequence": 0};
                    
                // Add Static Tab to The ones that come from API
                    const tabsHeaderList = [tab0, ...productTabsData.data];
                    


                // Store Values
                this.setState({
                    productTabs : tabsHeaderList,
                    productDetails : productDetailsWithColor,
                    relatedProducts : relatedProductsData,
                    productOverview : {...productDetailsWithColor, isOverview: true},
                    isLoaded : true
                });

                
            }
            catch (error) {
                
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
            const loadProjectOverviewPromise = await axios.get(Endpoints.getProduct, {params:{partid : this.partID, Bussmodel : 'XPLOR'}});
            const projectOverviewData = await loadProjectOverviewPromise.data[0];
            return projectOverviewData;
        }


        /** --------------------------------------
        // Get Related Projects
        // @param {partID <integer>}
        // @param {Produt search keywords <string array>}
        // @returns {A Promise Object}
        // --------------------------------------*/
        async loadRelatedProducts(productKeywords, customerName) {
            // return axios.get(Endpoints.getRelatedProducts,{params: { customerid : customerid ,partid: this.partID , keyword : productKeywords, Bussmodel: 'XPLOR'}})
            return axios.get(Endpoints.getRelatedProducts,{params: { category : customerName ,partid: this.partID , keyword : productKeywords, Bussmodel: 'XPLOR'}})
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
            if(!productsData) return [];
            let softValue = null
            const productsWithColor = productsData.map((product)=> {
                try {
                    for (let spColor of SPColorsCategories) {
                        if(product.SoftwareTopic && product.SoftwareTopic.indexOf(',') >= 0)
                            softValue = product.SoftwareTopic.split(',')[0];
                        else if (!product.SoftwareTopic)
                            softValue = ''
                        else
                            softValue = product.SoftwareTopic
                        if(softValue === spColor.name) {
                            product.color = spColor.color
                        }
                    }
                    return product;
                }
                catch(error) {
                    console.log("TCL: Dashboard -> mergeProductsAndColors -> error", error)
                    console.log("TCL: Dashboard -> mergeProductsAndColors -> product", product)

                    
                }
            })

            return productsWithColor;
        }

        
        /** --------------------------------------
        // Merge Single Object From API & SP
        // Based on Category Name
        // @param {productsData <API data>}
        // @param {SPColorsCategories <SP data>}
        // @returns {A new Array With Category Colors}
        // --------------------------------------*/
        mergeProductAndColors(productData, SPColorsCategories) {
            let productWithColor =  productData;
            let softValue = null

           try {
                for (let spColor of SPColorsCategories) {
                    if(productWithColor.SoftwareTopic && productWithColor.SoftwareTopic.indexOf(',') >= 0)
                        softValue = productWithColor.SoftwareTopic.split(',')[0];
                    else if (!productWithColor.SoftwareTopic)
                        productWithColor.color = ''
                    else
                        softValue = productWithColor.SoftwareTopic

                    // ? set Color value
                    if(softValue === spColor.name) {
                        productWithColor.color = spColor.color
                    }
                }
           }
           catch(error) {
                console.log("TCL: DetailsView -> mergeProductAndColors -> error", error)
               
           }

            return productWithColor;
        }

        
        // --------------------------------------
        // Get Product Tabs
        // --------------------------------------
        async loadProductTabs() {
            return axios.get(Endpoints.getProductTabs,{params: {Bussmodel: 'XPLOR'}});
        }
    

        /** --------------------------------------
        // Get Tab Attributes
        // @param {partid}
        // @param {busstypeid}
        // --------------------------------------
        **/
        async loadTabAttributes(busstypeid, isProductOverview) {

            if(busstypeid === 0 || busstypeid === "0" || busstypeid <= 0 ) {
                const {productDetails} = this.state;
                return {...productDetails, isOverview: true};
            }
            else {           
                const tabsDataAttrPromise = await axios.get(Endpoints.getTabAttributes, {params: {partid : this.partID, busstypeid : busstypeid, Bussmodel: 'XPLOR'}});
                const tabsAttrData = await tabsDataAttrPromise.data;
                return tabsAttrData;
            }
        }

        
        /** --------------------------------------
        // Get Tab Attributes When Tab Changes
        // @param {partid}
        // @param {busstypeid}
        // --------------------------------------
        **/
        async changeTabData (businessID) {

            if(parseInt(businessID) === this.state.currentTab)
                return;

            const {productTabs} = this.state;
            const isProductOverview = businessID === 0 ? true: false;
            const currentTab = productTabs.filter((tabItem)=> {
                return tabItem.BusinessTypeID === parseInt(businessID)
            })[0];
            
                            
            const newTabData = await  this.loadTabAttributes(businessID, isProductOverview); 

            this.originalValues = newTabData;
            
            this.setState({
                productOverview : newTabData,
                oldProductOverview : newTabData,
                currentTabName : currentTab.BusinessTypeName,
                tabLoading : false,
                currentTab: currentTab.BusinessTypeID

            })
        }




    /* ==========================================================================
    * //? State & Logic Functions
    ========================================================================== */

        // --------------------------------------
        // Change Tab and Get Business ID
        // If the Tab ID is the same as the 
        // state, exit. Is Clicking same tab
        // If the User is Editing the Tabs, block
        // Navigation
        // --------------------------------------
        onTabChange = (businessID) =>  {
            const {currentTab} =  this.state;
            if(parseInt(businessID) === parseInt(currentTab))
                return 
            // else if (this.state.userIsEditingTab === true)
            //     return ;
            else {
                this.setState({tabLoading: true})
                this.changeTabData(businessID)
            }
        
        }   

            
        // ?--------------------------------------
        // ? The User is Editing a Tab
        // ? true || false
        // ?--------------------------------------
        enableTabEdit = async (tabStatus , discardChanges) => {
            console.log("TCL: DetailsView -> enableTabEdit -> discardChanges", discardChanges)
            console.log("TCL: DetailsView -> enableTabEdit -> tabStatus", tabStatus)

            this.setState({userIsEditingTab : tabStatus})
            
            tabStatus === true 
            ? document.getElementsByClassName('rc-tabs-bar')[0].style.pointerEvents = "none"
            : document.getElementsByClassName('rc-tabs-bar')[0].style.pointerEvents = "all"


        }

        // --------------------------------------
        // Render Alert Message
        // --------------------------------------
        createAlert = (alertType, alertMessage) =>{
            // return <AlertManager  alertType = {alertType}  alertMessage = {alertMessage} />

            Alert.info(alertMessage, {
                position: 'top',
                effect : 'slide',
                timeout : 2000
            
            });
        }


        // ?--------------------------------------
        // ? Update State on Save Action
        // ? Update Product Overview Field
        // ?--------------------------------------
        saveFormValues = (currentViewValues) => {
            console.log("TCL: DetailsView -> saveFormValues -> currentViewValues", currentViewValues)
            console.log("TCL: DetailsView -> saveFormValues -> this.state", this.state)

            const {partID} = this.state.productDetails;

            this.setState({
                productOverview : currentViewValues,
                tabLoading : true
            })


            
            

            // let formData = Object.assign({}, currentViewValues, {partID});
            this.updateProductTab(this.state.currentTab,currentViewValues, partID).then((data) => {
                console.log("TCL: DetailsView -> saveFormValues -> this.state.currentTab", this.state.currentTab)
                console.log("TCL: DetailsView -> saveFormValues -> this.state", this.state)
                console.log("TCL: DetailsView -> saveFormValues -> data", data)

                this.setState({tabLoading : false})
                        
                this.createAlert('info', 'the data has been successfully saved');    
            
              }).catch((error) => {
                console.log("TCL: createNewProject -> error", error)
                  
              })
        }

        // ?--------------------------------------
        // ? Update Product Overview on DB
        // ?--------------------------------------
        updateProductTab = async (currentTabID, proDetails, partID) => {
            console.log("TCL: DetailsView -> updateProductTab -> CurrentTabID", currentTabID)
            console.log("TCL: DetailsView -> updateProductTab -> ProductDetails", proDetails)
            console.log("TCL: DetailsView -> updateProductTab -> ProductAttributes", this.state.productOverview)
            
            const currentTab = this.state.currentTab
            // const ProductAttributes = this.state.productOverview

            const ProductAttributes = proDetails
            console.log("TCL: DetailsView -> updateProductTab -> ProductAttributes", ProductAttributes)
            const userDetails = window.getCurrentSPUser();

            const partRecordCall = await axios.get(Endpoints.getPartRecord, {params: {partid : partID}});
            const readPartRecord = await partRecordCall.data;
            const attrJSON = readPartRecord.filter(i => i.BusinessTypeID == currentTab)[0];

            console.log("TCL: DetailsView -> updateProductTab -> PartRecordID",attrJSON.PartRecordID);
            let tabAttributes = [];
            ProductAttributes.forEach(ProDetail => {

                // ? Force N value on Empty Toggle
                if(ProDetail.datatype === 'boolean' && ProDetail.attrValues === "")
                    ProDetail.attrValues = 'N'


                // ? Save All Values
            
                // if(ProDetail.attrValues.length !== 0 && ProDetail.attrValues !== "")
                // {
                    let tabValues = [];
                    if(ProDetail.datatype.toString() !== "date")
                    {
                        ProDetail.attrValues.indexOf("||")>=0? 
                        tabValues=ProDetail.attrValues.split("||").filter(v=>v!='') : tabValues.push(ProDetail.attrValues)
                    }
                    else
                    {
                        tabValues.push(moment(ProDetail.attrValues).format("MM-DD-YYYY"));
                    }
                    let tabValueIDs = [];
                    ProDetail.valueID.indexOf("||")>=0 
                    ? tabValueIDs=ProDetail.valueID.split("||").filter(v => v !== '') 
                    : ProDetail.valueID !== "" 
                        ? tabValueIDs.push(ProDetail.valueID) 
                        : tabValueIDs.push("0")

                    let valSequence = []
                    for(let i=0;i<tabValues.length;i++)
                    {
                        valSequence.push((i+1).toString());
                    }
                
                    while(tabValues.length>tabValueIDs.length)
                    {
                        tabValueIDs.push("0")
                    }

                    let tabdata=JSON.stringify({
                        'partrecordid': attrJSON.PartRecordID,
                        'attrdefid':ProDetail.attrID,
                        'IsMulti': ProDetail.IsMultiValues ? 1:0,
                        'updated_by': userDetails.user_email ,
                        'value': tabValues,
                        'valueid': tabValueIDs,
                        'seq': valSequence
                    })

                    tabAttributes.push(tabdata);
                // }
            });
            

            // ? Create Request Data
            // ? Tab Attributes
            let data = "{attrvals:["+tabAttributes+"]}";
             
            console.log("TCL: DetailsView -> updateProductTab -> ProductAttributes-Constructed",data)
                
            // ? Send Promise Request

            return axios({
                method : 'post',
                url : Endpoints.updateTabAttributes,
                headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "application/json"},
                data : data
                
            });
            

        }


        // ?--------------------------------------
        // ? Update State With New Values From
        // ? Add Project component
        // ?--------------------------------------
        updateOverViewStatus = (newOverview, stateValues) =>{
            console.log("TCL: DetailsView -> updateOverViewStatus -> stateValues", stateValues)
            console.log("TCL: DetailsView -> updateOverViewStatus -> newOverview", newOverview)

            // this.state.productOverview
            // console.log("TCL: DetailsView -> updateOverViewStatus -> this.state.productOverview", this.state.productOverview)
            console.log("TCL: DetailsView -> updateOverViewStatus -> this", this)

            let {productOverview} = this.state;
            let newStateOverview = Object.assign({}, productOverview);
            // console.log("TCL: DetailsView -> updateOverViewStatus -> newStateOverview original", newStateOverview)

            // // ? Overwrite Object, since this the parent data, the object can be muted
            

            // //? Extract PeoplePicker Data
            let ownerValues = this.formatPeoplePickerNames(newOverview.dataUpdated.ownerValues.DisplayText)
            let coOwnerValues = this.formatPeoplePickerNames(newOverview.dataUpdated.coOwnerValues.DisplayText)

            // // productOverview.ClosingComments: ""

            // ? Overwrite Project Data 

            newStateOverview.CoownerEmail  =  newOverview.dataUpdated.coOwnerValues.Description;
            newStateOverview.CoownerFirstName = coOwnerValues.firstName ;
            newStateOverview.CoownerLastName =  coOwnerValues.lastName;
            // newStateOverview.CreatedDate =  "7/17/2019 10 = 13 = 23 AM"
            newStateOverview.Customers =  newOverview.vendor.label;
            // newStateOverview.DescriptionMaxLength =  600
            newStateOverview.DetailedDescription =  newOverview.projectName;
            newStateOverview.DetailedProductName =   newOverview.shortDescription;
            newStateOverview.IconValue =  newOverview.cardIcon !== "" ? newOverview.cardIcon : productOverview.IconValue
            // newStateOverview.LastUpdateDate =  "7/18/2019 8 = 12 = 36 AM"
            // newStateOverview.MfrPartID =  12188
            newStateOverview.OwnerEmail =  newOverview.dataUpdated.ownerValues.Description
            newStateOverview.OwnerFirstName =  ownerValues.firstName;
            newStateOverview.OwnerLastName =  ownerValues.lastName;
            // newStateOverview.ProductLifecycle =  "OPEN"
            newStateOverview.ProductName =  newOverview.projectName;
            // newStateOverview.ProductScope =  "Global Implementation"
            newStateOverview.ProductType =  newOverview.proCategory.label
            // newStateOverview.ProjectNumberMaxLength =  50
            newStateOverview.SearchKeyword =  newOverview.keywordsList.join(',');
            newStateOverview.ShortDescription =  newOverview.shortDescription;
            newStateOverview.Shortname = newOverview.projectName;
            // newStateOverview.SoftwareTopicMain =  newOverview.softwareTopic[0].label;
            newStateOverview.SoftwareTopic =  this.formatSoftwareTopicValues(newOverview.softwareTopic);
            // newStateOverview.SoftwareTopicID =  "1024"
            newStateOverview.Vendors =   newOverview.vendor.label
            newStateOverview.color =  newOverview.cardColor
            // newStateOverview.isOverview =  true
            // newStateOverview.partID =  16548
            // newStateOverview.partProjectID =  11874

            newStateOverview.updatePanelContent = true


            console.log("TCL: DetailsView -> updateOverViewStatus -> newStateOverview updated", newStateOverview)

            this.setState({
                productOverview : newStateOverview,
                productDetails : newStateOverview
            })


            //   // this.state
              console.log("TCL: DetailsView -> updateOverViewStatus -> this.state", this.state)

          

        }



        // ?--------------------------------------
        // ? Split Values of People Pciker
        // ?--------------------------------------
        formatPeoplePickerNames(userEmail) {
            if(userEmail === "") 
                return "";
            
            // ? Get First Name & Last Name by .
            let userArray = userEmail.split(' ');
            let userData = {
                firstName : userArray[0],
                lastName : userArray[1]
            }

            return userData
        }



        // ?--------------------------------------
        // ? Split values of Softweare Topic
        // ?--------------------------------------
        formatSoftwareTopicValues(softwareTopic) {
            let functionalCategory = ''
            if(Array.isArray(softwareTopic) ===  true && softwareTopic.length > 0) {
                let fc = softwareTopic.map((sftItem)=>{
                    if(sftItem.label)
                        return sftItem.label
                    else    
                        return sftItem
                }).join(',')

               functionalCategory = fc;
            }

                
            else
                functionalCategory = softwareTopic


            return functionalCategory
        }



    /* ==========================================================================
    * //? Render Methods
    ========================================================================== */

        
        // --------------------------------------
        // Render BreadCumbs
        // --------------------------------------
        renderBreadcumbs() {
            const {SoftwareTopic, ProductName,SoftwareTopicID} = this.state.productDetails;
            let functionalCategory = '';
            // ? Split Sogtware Topic

            if(SoftwareTopic === null ||  SoftwareTopic === undefined)
                functionalCategory = ""

            else if(Array.isArray(SoftwareTopic) ===  true) 
                functionalCategory   = SoftwareTopic[0].label
            else {
                let fcArray = SoftwareTopic.split(',')
                functionalCategory   = fcArray[0]
            }
                

            return <Breadcumbs softwareTopic = {functionalCategory} productName = {ProductName} softwareTopicID = {SoftwareTopicID}/>
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

                                relatedProducts && relatedProducts.map((product, index) => {
                                    
                                    if(index <= 2)
                                        return (

                                                <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 ">
                                                    <ProjectCard key = {product.partID} hasSmallDescription={true} {...product} /> 
                                                </div>
                                        )
                                    else 
                                        return null
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
            const {productTabs, productOverview, tabLoading, currentTabName} = this.state;
            const {isOverview} = productOverview;
            return (
                <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                    <CustomTabs tabLoading = {tabLoading} tabsData = {productTabs} onTabChange = {this.onTabChange.bind(this)}>
                        <WideCard  >
                            
                            <PanelContent 
                                tabLoading = {tabLoading} 
                                tabTitle = {currentTabName}  
                                panelTabContent = {productOverview} 
                                isOverview = {isOverview} 
                                enableTabEdit =  {this.enableTabEdit}
                                formName = {currentTabName}
                                updateOverViewStatus = {this.updateOverViewStatus}
                                updateFormValues = {this.saveFormValues}
                            /> 

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
        // renderProjectOverview(productOverview) {
        //     console.log("TCL: DetailsView -> renderProjectOverview -> productOverview", productOverview)
        //     return (
        //         <WideCard  
        //             productData = {productOverview} 
        //             isOveview = {true} >

        //         <CardHeaderWide productOverview = {productOverview} />  
                
        //     </WideCard>
        //     )    
        // }

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


