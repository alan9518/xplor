/* ==========================================================================
 * App Searchn Input Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment }  from 'react'
    import PropTypes from 'prop-types'
    import {SingleSelect} from '../../components'


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
                products : [],
            }
        }


        // --------------------------------------
        // Initial Shuffle
        // --------------------------------------
        // componentDidMount() {
        //     // this.setState({isLoaded : false})
        //     this.loadProjects()
        // }


        /* ==========================================================================
         *  API Calls
         ========================================================================== */

           // --------------------------------------
           // Get Data and save it into the State
           // --------------------------------------
            // async loadProjects() {
            
            //     const topicName = this.splitRouteName();
            //     const params = {customerid : this.props.match.params.key}

            //     // Get Carrousel Products. Create Promise
            //         const getCarrouselProductsPromise =  await axios.get(Endpoints.getCarrouselProducts);

            //     // // Get All Products. Createn Promise 
            //         const getProductsPromise = topicName === 'all' 
            //             ? await axios.get(Endpoints.getAllProducts) 
            //             : await axios.get(Endpoints.getAllProductsByCategory,{params});


            //     // Get SP Colors
            //         const SPColorsCategories = await  this.loadSPCategories();


            //     // Resolve Promises
            //         const productsData = getProductsPromise.data;
            //         const carrouselData = getCarrouselProductsPromise.data;



            //     // Merge Colors and Projects
            //         const productsWithColor = this.mergeProductsAndColors(productsData, SPColorsCategories);


            //     // Store Results

            //     this.setState( {
            //         currentCategory : `${startCase(topicName)}  Products`,
            //         products : productsWithColor || [],
            //         carrouselproducts : carrouselData || [],
            //         isLoaded : true
            //     })
            // }

        

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {

            const options = [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ]

            return (
                <Fragment>
                        <SingleSelect
                            isClearable={true}
                            isSearchable={true}
                            options={options}
                        />
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