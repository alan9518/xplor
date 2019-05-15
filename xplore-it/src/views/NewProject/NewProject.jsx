/* ==========================================================================
 * Form View of add a New Project 
 * 12/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    // import PropTypes from 'prop-types';
    import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard,WideCard,CardHeaderWide, FieldsMaker, NoData} from '../../components';
    import moment from 'moment';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class NewProject extends Component {


        /* ==========================================================================
        * //? Component Setup
        ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    productTabs: [],
                    currentTab: 0,
                    relatedProducts: [],
                    productDetails: {},
                    currentTabName: 'Project Overview',
                    editingContent: false,
                    isLoaded: false,
                    showError: false,
                    tabLoading: false
                }

                this.overviewValues = [
                    {
 
                        "attrName": "bgColor",
                        "sequence": 3,
                        "datatype": "color",
                        "maxlength": "10",
                        "attrValues": "",
                        "partRecord": "",
                        "valueID": "",
                        "valsequence": ""
                    },

                    {
 
                        "attrName": "icon",
                        "sequence": 3,
                        "datatype": "icon",
                        "maxlength": "10",
                        "attrValues": "",
                        "partRecord": "",
                        "valueID": "",
                        "valsequence": ""
                    },

                    {
 
                        "attrName": "Uploaded",
                        "sequence": 3,
                        "datatype": "date",
                        "maxlength": "10",
                        "attrValues":  moment().format("MM/DD/YYYY"),  
                        "partRecord": "",
                        "valueID": "",
                        "valsequence": ""
                    },
                    {
 
                        "attrName": "Last Update",
                        "sequence": 10,
                        "datatype": "date",
                        "maxlength": "",
                        "attrValues":  moment().format("MM/DD/YYYY"), 
                        "partRecord": "92347",
                        "valueID": "92385",
                        "valsequence": "1"
                    },
                    {
 
                        "attrName": "Owner",
                        "sequence": 20,
                        "datatype": "peoplePicker",
                        "maxlength": "",
                        "attrValues": "Finance: bookmark",
                        "partRecord": "92372",
                        "valueID": "92410",
                        "valsequence": "1"
                    },
                    {
 
                        "attrName": "Co-Owner",
                        "sequence": 30,
                        "datatype": "peoplePicker",
                        "maxlength": "",
                        "attrValues": "",
                        "partRecord": "",
                        "valueID": "",
                        "valsequence": ""
                    },
                    {
 
                        "attrName": "Description",
                        "sequence": 40,
                        "datatype": "String",
                        "maxlength": "",
                        "attrValues": "",
                        "partRecord": "92373",
                        "valueID": "92411",
                        "valsequence": "1"
                    },
                   
                  
                  
                ]

            }

            // --------------------------------------
            // Load API and Set State
            // --------------------------------------
            componentDidMount() {
                // this.loadAPI();
                const tab0 = { "BusinessTypeID": 0, "BusinessTypeName": "Product Overview", "Sequence": 0};
                    
                // Add Static Tab to The ones that come from API
                // const tabsHeaderList = [tab0, ...productTabsData];
				// console.log("TCL: DetailsView -> loadAPI -> tabsHeaderList", tabsHeaderList)
                this.setState({productTabs : [tab0], isLoaded : true});
            }


        /* ==========================================================================
        * //? State & Logic Functions
        ========================================================================== */

            // --------------------------------------
            // Change Tab and Get Business ID
            // If the Tab ID is the same as the 
            // state, exit. Is Clicking same tab
            // --------------------------------------
            onTabChange = (businessID) =>  {
                const {currentTab} =  this.state;
                if(businessID === currentTab || businessID === 0)
                    return 
                else {
                    this.setState({tabLoading: true})
                    this.changeTabData(businessID)
                }
            
            }   




        /* ==========================================================================
        * //? Render Methods
        ========================================================================== */

            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader customHeight = {800}/> </div>
            }

            // --------------------------------------
            // Render BreadCumbs
            // --------------------------------------
            renderBreadcumbs() {
                const {SoftwareTopic, ProductName,SoftwareTopicID} = this.state.productDetails;
                return <Breadcumbs softwareTopic = {SoftwareTopic} productName = {ProductName} softwareTopicID = {SoftwareTopicID}/>
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
            // Render View Body
            // --------------------------------------
            renderFormViewContainer () {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12  col-lg-12 col-sm-12">
                                
                                {this.renderProductDetails()}
                            </div>

                        </div>
                    </div>
                )
            }


            
        // --------------------------------------
        // Render Tab Content
        // --------------------------------------            
        renderProductDetails() {
            const {productTabs, tabLoading, currentTabName} = this.state;
			console.log("TCL: DetailsView -> renderProductDetails -> currentTabName", currentTabName)
            
            return (
                <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                    <CustomTabs tabLoading = {tabLoading} tabsData = {productTabs} onTabChange = {this.onTabChange.bind(this)}>
                        <WideCard  >
                            
                        <PanelContent 
                            tabLoading = {tabLoading} 
                            tabTitle = {currentTabName}  
                            panelTabContent = {this.overviewValues} 
                            isOverview = {true} 
                            newProject = {true}
                            editFields = {true}/> 
                
                        </WideCard>
                    </CustomTabs>
                </div>
            )
        }


            // --------------------------------------
            // Render Form
            // --------------------------------------   
            renderForm() {
                const {showError}  = this.state;
                return (
    
                    <Fragment>
                        {showError === true ? this.renderErrorPage(): this.renderFormViewContainer()}
                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                return isLoaded ? this.renderForm() : this.renderLoader();
            }
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
// NewProject.propTypes = {
// prop: PropTypes
// }


// --------------------------------------
// Export Component
// --------------------------------------
export default NewProject; 