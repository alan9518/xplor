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
    
    import { SideBarLink, AppLoader } from '../../components'
    import { Endpoints } from '../../services/endpoints';
    import {withRouter} from 'react-router-dom';
    import axios from 'axios';
    import './styles.css';
    import {Config} from '../../Config'
    const {spPath, Bussmodel} = Config // ? Host Path
 


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
            alllowType : true
        }
    }

    // --------------------------------------
    // Set State
    // --------------------------------------
    // async componentDidMount() {
    //     this.loadProducts()
    // }


/* ==========================================================================
** Component Setup
** ========================================================================== */



    // --------------------------------------
    // Load Products
    // --------------------------------------
    async loadProducts() {
        const params = {Bussmodel: Bussmodel}
        //Create Promises
        const allProductsPromise = axios.get(Endpoints.getProductSearch,  {params});
        const SPColorsPromise = axios.get(Endpoints.getSideBarCategoriesSP);

        // Resolve Promises
        const [allProductsData, SpColorsData] = await Promise.all([allProductsPromise, SPColorsPromise])

        // Extract Data
        const productsArray = allProductsData.data;
        // console.log("​Search -> loadProducts -> productsArray", productsArray)
        const colorsArray = await this.loadSPCategoriesColors(SpColorsData.data.value);
        // console.log("​Search -> loadProducts -> colorsArray", colorsArray);

        // Merge Products and Colors
        const productsWithColor = this.mergeProductsAndColors(productsArray, colorsArray);
        console.log("​Search -> loadProducts -> productsWithColor", productsWithColor);

        // Set State
        this.setState({
            productsOptions: productsWithColor,
            isLoaded: true,
            alllowType : true
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

    getData = (event)=> {
        this.setState({alllowType : false})
        this.loadProducts();
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
        // if( !this.state.alllowType)
        //     return
        e.key === 'Enter' && this.filterFirstOption(e);
    }

    // --------------------------------------
    // Take The First Option of the 
    // Result List and Open it
    // --------------------------------------
    filterFirstOption(event) {
        event.preventDefault();
        const {resultsList} = this.state;
        const selectedOption = resultsList.length > 0 ? resultsList[0] : null;
        if (selectedOption)  {
            this.onResultItemClick();
            this.handleRedirect(selectedOption)
        }
        else
            return;
    }

    // --------------------------------------
    // Check the Current Page before Redirecting
    // app/Details/ --> Just Change AppID
    // Any Oother, change the Whole route
    // --------------------------------------
    handleRedirect(option) {
        const {history} = this.props;
        
        history.push(`${spPath}/app/details/${option.partID}`)


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

       try {
            // Exit If Input is Empty
            if (searchInput === "") return [];

            // Start Filter
            const { productsOptions } = this.state;
            let searchResults = productsOptions.filter((product) => {
                let searchName = product.ProductName.toLowerCase() || product.Shortname.toLowerCase();
                let searchTopic = this.formatSoftwareTopic(product.SoftwareTopic).toLowerCase();
                let ownerName =  product.OwnerName.toLowerCase();
                let coOwnerName = product.DelegateName.toLowerCase();
    
    
                let searchKeywords = product.SearchKeyword.toLowerCase();
                
                return (searchName.indexOf(searchInput) > -1 || searchTopic.indexOf(searchInput) > -1 || searchKeywords.indexOf(searchInput) > -1 || ownerName.indexOf(searchInput) > -1 || coOwnerName.indexOf(searchInput) > -1  )
    
            });
    
            console.log("​Search -> filterOptions -> searchResults", searchResults)
            return searchResults;
       }
       catch(error) {
        console.log("TCL: Search -> filterOptions -> error", error)
        return []
       }
    }


    // --------------------------------------
    // FOrmat SOftware Topic
    // GEt Main One
    // --------------------------------------
    formatSoftwareTopic(sft) {
        
        let functionalCategory = ''
        if(Array.isArray(sft) ===  true) 
            functionalCategory =  sft[0] || sft[0].label
        else
            functionalCategory   = sft
    
        return functionalCategory !== null ? functionalCategory : ""
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
        const { resultsList, query, alllowType } = this.state;
        let inputClasses = alllowType === false ? 'form-control py-2 border-right-0 border int-loading' : 'form-control py-2 border-right-0 border'
         return (
            <Fragment>
                <div className="xpl-searchContainer">
                    <div className="input-group">
                        <input
                            className = {inputClasses}
                            type="search"
                            // placeholder="Product Name, Category or Keywords"
                            placeholder = "Product Name, Keywords, etc."
                            id="xpl-searchInput"
                            ref={input => this.searchValues = input}
                            onChange={this.handleInputChange}
                            onKeyPress={(e) => this.handleKeyPress(e)}
                            onFocus = {this.getData}
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
    // {isLoaded && this.renderSearchContainer(productsOptions)}
    // --------------------------------------
    render() {
        const { productsOptions, isLoaded } = this.state;
        return (
            <Fragment>
            {this.renderSearchContainer()}
            </Fragment>
        )
    }
}



// --------------------------------------
// Export Component
// --------------------------------------
    export default withRouter(Search);  