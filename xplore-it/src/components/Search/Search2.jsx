/* ==========================================================================
 * App Searchn Input Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
import React, { Component, Fragment }  from 'react'
// import PropTypes from 'prop-types'
import {SingleSelect, MultipleSelect} from '../../components'
import {Endpoints} from '../../services/endpoints';
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
            currentCategory : 'All Apps',
            isLoaded : false,
            categoryColor : '',
            productsOptions : [],
        }
    }


    // --------------------------------------
    // Initial Shuffle
    // --------------------------------------
    componentDidMount() {
        // this.setState({isLoaded : false})
        this.loadProducts()
    }

    /* ==========================================================================
     *  API Calls
     ========================================================================== */

        // --------------------------------------
        // Get Data and save it into the State
        // --------------------------------------
        async loadProducts() {
        

            // Get All Products. Createn Promise 
                const getProductsPromise =  await axios.get(Endpoints.getAllProducts) 

            // Resolve Promises
                const productsData =  await getProductsPromise.data;


            // Store Results
                const searchProducts = this.formatResults(productsData);

            this.setState( {
                productsOptions : searchProducts || [],
                isLoaded : true
            })
        }



        // --------------------------------------
        // Format Products to Match React Select
        // --------------------------------------
        formatResults(productsData) {
            let selectOption = {};
            const selectData =  productsData.map((product)=>{
                selectOption =   { label :  product.ProductName, value : product.partID }
                return selectOption;
            })
            console.log("​Search -> formatResults -> selectData", selectData)
            return selectData;
            
        }




    renderSearchContainer(productsOptions) {
        return (
                <SingleSelect
                    isClearable={true}
                    isSearchable={true}
                    options={productsOptions}
                />  
        )
    }

    // --------------------------------------
    // Render Component
    // --------------------------------------
    render() {
        const {productsOptions, isLoaded} = this.state;
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