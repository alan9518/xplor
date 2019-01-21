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
    import { SideBarLink } from '../../components'
    import { Endpoints } from '../../services/endpoints';
    import {withRouter} from 'react-router-dom';
    import axios from 'axios';
    import './styles.css';


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
            isSearching: false,
            query: '',
            productsOptions: [],
            isLoaded: false,
            resultsList: [],
        }
    }

    // --------------------------------------
    // Set State
    // --------------------------------------
    componentDidMount() {
        this.loadProducts()
    }


    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */



        // --------------------------------------
        // Load Products
        // --------------------------------------
        async loadProducts() {
            //Create Promises
            const allProductsPromise = axios.get(Endpoints.getAllProducts);
            const SPColorsPromise = axios.get(Endpoints.getSideBarCategoriesSP);

            // Resolve Promises
            const [allProductsData, SpColorsData] = await Promise.all([allProductsPromise, SPColorsPromise])

            // Extract Data
            const productsArray = allProductsData.data;
            console.log("​Search -> loadProducts -> productsArray", productsArray)
            const colorsArray = await this.loadSPCategoriesColors(SpColorsData.data.value);
            console.log("​Search -> loadProducts -> colorsArray", colorsArray);

            // Merge Products and Colors
            const productsWithColor = this.mergeProductsAndColors(productsArray, colorsArray);
            console.log("​Search -> loadProducts -> productsWithColor", productsWithColor);

            // Set State
            this.setState({
                productsOptions: productsWithColor,
                isLoaded: true
            })
        }

        /** --------------------------------------
        // Iterate Colors from Sharepint and 
        // Extract Color Code & Name 
        // @returns {A Promise Object}
        // --------------------------------------*/
        async loadSPCategoriesColors(SpResponse) {
            const SPCatsArray = (SpResponse.map((SpCat) => {
                return {
                    color: SpCat.Color,
                    name: SpCat.Title,
                }
            }));

            return (SPCatsArray);
        }

        // --------------------------------------
        // Merge Products & Categories Color
        // --------------------------------------
        mergeProductsAndColors(productsData, SPColorsCategories) {
            const productsWithColor = productsData.map((product) => {
                for (let spColor of SPColorsCategories) {
                    if (product.SoftwareTopic === spColor.name) {
                        product.color = spColor.color
                    }
                }
                return product;
            })

            return productsWithColor;
        }




    /* ==========================================================================
    ** Handle State
    ** ========================================================================== */

        // --------------------------------------
        // Get Input Values
        // --------------------------------------
        handleInputChange = (e) => {
            let searchInput = (this.searchValues.value).toLowerCase();
            let searchResults = this.filterOptions(searchInput);
            this.setState({
                query: this.searchValues.value,
                resultsList: searchResults,
            })
        }


        // --------------------------------------
        // Listen For KeyPress
        // Look For 'Enter'
        // --------------------------------------
        handleKeyPress = (e) => {
            e.key === 'Enter' && this.filterFirstOption(e);
        }

        // --------------------------------------
        // Take The First Option of the 
        // Result List and Open it
        // --------------------------------------
        filterFirstOption(event) {
            event.preventDefault();
            const {resultsList} = this.state;
            const selectedOption =  resultsList[0];
            this.onResultItemClick();
            this.handleRedirect(selectedOption)
        }

        // --------------------------------------
        // Check the Current Page before Redirecting
        // app/Details/ --> Just Change AppID
        // Any Oother, change the Whole route
        // --------------------------------------
        handleRedirect(option) {
            const {history} = this.props;
            
            this.props.history.push(`${option.partID}`)


        }

        // --------------------------------------
        // Close Results List & Reset Input
        // --------------------------------------
        onResultItemClick = (e) => {
            this.setState({ resultsList: [], query: '' })
        }

        // --------------------------------------
        // Filter Data
        // --------------------------------------
        filterOptions(searchInput) {

            // Exit If Input is Empty
            if (searchInput === "") return [];

            // Start Filter
            const { productsOptions } = this.state;
            let searchResults = productsOptions.filter((product) => {
                let searchName = product.ProductName.toLowerCase() || product.Shortname.toLowerCase();
                let searchTopic = product.SoftwareTopic.toLowerCase();
                let searchKeywords = product.SearchKeyword.toLowerCase();

                return (searchName.indexOf(searchInput) > -1 || searchTopic.indexOf(searchInput) > -1 || searchKeywords.indexOf(searchInput) > -1)

            });

            console.log("​Search -> filterOptions -> searchResults", searchResults)
            return searchResults;
        }


        // --------------------------------------
        // Apply Filter
        // --------------------------------------
        formatFilter(value) {
            return value.toLowerCase();
        }

        // --------------------------------------
        // Remove Character from IconValue
        // --------------------------------------
        formatIconName(iconName) {
            let newName = iconName.substr(iconName.indexOf(':') + 1, iconName.length);
            return newName.trim();
        }



    /* ==========================================================================
    ** Render Functions
    ** ========================================================================== */

        // --------------------------------------
        // Render Filter Input
        // --------------------------------------
        renderSearchContainer() {
            const { resultsList, query } = this.state;
            return (
                <Fragment>
                    <div className="xpl-searchContainer">
                        <div className="input-group">
                            <input
                                className="form-control py-2 border-right-0 border"
                                type="search"
                                placeholder="Product Name, Category or Keywords"
                                id="xpl-searchInput"
                                ref={input => this.searchValues = input}
                                onChange={this.handleInputChange}
                                onKeyPress={(e) => this.handleKeyPress(e)}
                                value={query}
                            />
                            <span className="input-group-append">
                                <div className="input-group-text bg-transparent">
                                    <i className="fa fa-search"></i>
                                </div>
                            </span>
                        </div>

                        {resultsList.length > 0 && this.renderResultsList(resultsList)}

                    </div>
                </Fragment>
            )
        }


        // --------------------------------------
        // Render Results
        // --------------------------------------
        renderResultsList(results) {
            const context = this;
            return (
                <Fragment>
                    <div className="xpl-resultsContainer xpl-shadow">
                        <ul>
                            {
                                results && results.map((resultItem) => {
                                    return (
                                        <SideBarLink
                                            key={resultItem.partID}
                                            indexKey={`res-${resultItem.partID}`}
                                            title={resultItem.ProductName}
                                            link={`app/details/${resultItem.partID}`}
                                            color={resultItem.color}
                                            customIcon={context.formatIconName(resultItem.IconValue)}
                                            hideMobileMenu={this.onResultItemClick}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Fragment>
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
// Export Component
// --------------------------------------
    export default withRouter(Search);  