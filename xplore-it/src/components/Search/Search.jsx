/* ==========================================================================
 * App Searchn Input Component 
 * Using reactivesearch https://github.com/appbaseio/reactivesearch
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react'
    import PropTypes from 'prop-types'
    import { Endpoints } from '../../services/endpoints';
    import axios from 'axios';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class Search extends Component {


        // --------------------------------------
        // constructor
        // --------------------------------------\
        constructor(props) {
            super(props);
            this.state = {
                // productsResults : [],
                query : '',
                productsResults: [
                    {
                        "partID": 16009,
                        "ProductName": "Agile",
                        "ShortDescription": "Agile: The Product Data Management tool of Flex",
                        "SoftwareTopic": "Education",
                        "IconValue": "IT: microchip",
                        "CreatedDate": "11/2/2018 5:24:58 PM",
                        "SearchKeyword": "PDM,Engineering,Parts,ECO,MCO",
                        "Shortname": "AGILE",
                        "Customers": "Flex",
                        "Vendors": "Oracle",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16002,
                        "ProductName": "CMT",
                        "ShortDescription": "CMT - Commercial Management Tool",
                        "SoftwareTopic": "Finance",
                        "IconValue": "Finance: dollar-sign",
                        "CreatedDate": "10/31/2018 7:52:31 PM",
                        "SearchKeyword": "Claims,Finance,Tracking,Liability",
                        "Shortname": "CMT",
                        "Customers": "Flex",
                        "Vendors": "Flex",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16014,
                        "ProductName": "Incorta.",
                        "ShortDescription": "Incorta. - Analytics Platform",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: chart-line",
                        "CreatedDate": "11/8/2018 9:47:37 PM",
                        "SearchKeyword": "Reporting,Analytics",
                        "Shortname": "INCORTA",
                        "Customers": "Flex",
                        "Vendors": "Flex",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16004,
                        "ProductName": "Keystone",
                        "ShortDescription": "Keystone - The Master Data Management Metadata Manager and Hub",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: atlas",
                        "CreatedDate": "10/31/2018 7:58:26 PM",
                        "SearchKeyword": "MDM,Master Data,Reference Data, GDH",
                        "Shortname": "KEYSTONE",
                        "Customers": "Flex",
                        "Vendors": "Flex",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16012,
                        "ProductName": "MIcrosoft IOT",
                        "ShortDescription": "",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: network-wired",
                        "CreatedDate": "11/7/2018 9:14:46 PM",
                        "SearchKeyword": "IOT,ML",
                        "Shortname": "IOT",
                        "Customers": "Flex",
                        "Vendors": "Microsoft",
                        "ProductType": "Technology"
                    },
                    {
                        "partID": 16011,
                        "ProductName": "QUALfx",
                        "ShortDescription": "QUALfx: Global Quality System in Flex",
                        "SoftwareTopic": "Communication",
                        "IconValue": "Quality: tasks",
                        "CreatedDate": "11/5/2018 10:01:16 PM",
                        "SearchKeyword": "Quality,Cielo,C++",
                        "Shortname": "QUALFX",
                        "Customers": "Flex",
                        "Vendors": "Flex",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16008,
                        "ProductName": "SAP MDM",
                        "ShortDescription": "MDM - The global Master Data Management repository for Flex",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: globe",
                        "CreatedDate": "10/31/2018 8:32:37 PM",
                        "SearchKeyword": "MDM,SUPPLIER,MANUFACTURER,GDH",
                        "Shortname": "MDM",
                        "Customers": "Flex",
                        "Vendors": "SAP",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16010,
                        "ProductName": "SharePoint",
                        "ShortDescription": "SharePoint Global Content Mgmt System",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "Comms: file",
                        "CreatedDate": "11/2/2018 9:38:28 PM",
                        "SearchKeyword": "SharePoint,Sharenet,Document",
                        "Shortname": "SP",
                        "Customers": "Flex",
                        "Vendors": "Microsoft",
                        "ProductType": "Application"
                    },
                    {
                        "partID": 16015,
                        "ProductName": "TAMR",
                        "ShortDescription": "TAMR - Align disparate data sources to a unified schema",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: info",
                        "CreatedDate": "11/8/2018 7:24:53 PM",
                        "SearchKeyword": "MDM,Data,EDW,Sources",
                        "Shortname": "TAMR",
                        "Customers": "Flex",
                        "Vendors": "Oracle",
                        "ProductType": "Technology"
                    },
                    {
                        "partID": 16005,
                        "ProductName": "Teradata",
                        "ShortDescription": "Teradata - Our Enterprise Data Warehouse Appliance",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: database",
                        "CreatedDate": "10/31/2018 8:07:15 PM",
                        "SearchKeyword": "EDW, Datawarehouse",
                        "Shortname": "TD",
                        "Customers": "Flex",
                        "Vendors": "Teradata",
                        "ProductType": "Technology"
                    },
                    {
                        "partID": 16007,
                        "ProductName": "Workday",
                        "ShortDescription": "Workday - Our Global HR Portal",
                        "SoftwareTopic": "Human Resources",
                        "IconValue": "HR: universal-access",
                        "CreatedDate": "10/31/2018 8:18:53 PM",
                        "SearchKeyword": "HR,Travel,Expenses",
                        "Shortname": "WD",
                        "Customers": "Flex",
                        "Vendors": "Workday",
                        "ProductType": "Technology"
                    },
                    {
                        "partID": 16003,
                        "ProductName": "XplorIT",
                        "ShortDescription": "XplorIT - The IT Exploration Tool",
                        "SoftwareTopic": "Productivity (IT Tools)",
                        "IconValue": "IT: tablet-alt",
                        "CreatedDate": "10/31/2018 7:49:40 PM",
                        "SearchKeyword": "Products,Solution,Application,Technology",
                        "Shortname": "XPLORIT",
                        "Customers": "Flex",
                        "Vendors": "Flex",
                        "ProductType": "Application"
                    }
                ],
                isLoaded : false
            }
        }


        // --------------------------------------
        // Initial Shuffle
        // --------------------------------------
        componentDidMount() {
            this.setState({isLoaded : true})
            // this.loadProducts()
        }


        // --------------------------------------
        // Get Input Values
        // --------------------------------------
        handleInputChange = (e) => {
            console.log("​Search -> handleInputChange -> e", e)
            let searchResults = this.filterOptions(this.searchValues.value);
            this.setState({
                query : this.searchValues.value
            })
        }

        // --------------------------------------
        // Filter Data
        // --------------------------------------
        filterOptions(searchInput) {
            const { productsOptions} = this.state;

            let searchResults = productOptions.filter()

        }





        // --------------------------------------
        // Render Filter Input
        // --------------------------------------
        renderSearchContainer() {

            return (
                <Fragment>
                    <div className="xpl-searchContainer">
                        <div className="input-group">
                            <input 
                                    className="form-control py-2 border-right-0 border" 
                                    type="search" 
                                    placeholder="Search By Keywords" 
                                    id="xpl-searchInput" 
                                    ref = {input=> this.searchValues = input}
                                    onChange = {this.handleInputChange}
                                />
                            <span className="input-group-append">
                                <div className="input-group-text bg-transparent">
                                    <i className="fa fa-search"></i>
                                </div>
                            </span>
                        </div>
                    </div>
                </Fragment>
            )
        }


        // --------------------------------------
        // Render Results
        // --------------------------------------
        renderResultsList(results) {
            return (
                <ul>

                </ul>
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            const { productsOptions, isLoaded } = this.state;
            return (
                <Fragment>
                    {isLoaded && this.renderSearchContainer(productsOptions)}
                </Fragment>
            )
        }
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
// Search.propTypes = {
// prop: PropTypes
// }


// --------------------------------------
// Export Component
// --------------------------------------
    export default Search; 