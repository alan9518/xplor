/* ==========================================================================
 * Main Dashboard Template View
 * Add Here all the Components that will show on the main Panel
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import {
        Carrousel,
        ProjectsHolder,
        AppLoader, 
    } from "../../components";

    
    import {shuffle, startCase, replace} from "lodash";
    import {Endpoints} from '../../services/endpoints';
    import axios from 'axios';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {


        // --------------------------------------
        // constructor
        // --------------------------------------\
        constructor(props) {
            super(props);
            this.state = {
                currentCategory : 'All Apps',
                isLoaded : true,
                categoryColor : '',
                products : [],
                carrouselproducts : []
            }
        }


        // --------------------------------------
        // Initial Shuffle
        // --------------------------------------
        componentDidMount() {
            this.setState({isLoaded : false})
            this.loadProjects()
        }


        /* ==========================================================================
         *  API Calls
         ========================================================================== */

           // --------------------------------------
           // Get Data and save it into the State
           // --------------------------------------
            async loadProjects() {
            
                const topicName = this.splitRouteName();
                const params = {customerid : this.props.match.params.key}

                // Get Carrousel Products. Create Promise
                    const getCarrouselProductsPromise =  await axios.get(Endpoints.getCarrouselProducts);

                // // Get All Products. Createn Promise 
                    const getProductsPromise = topicName === 'all' 
                        ? await axios.get(Endpoints.getAllProducts) 
                        : await axios.get(Endpoints.getAllProductsByCategory,{params});


                // Get SP Colors
                    const SPColorsCategories = await  this.loadSPCategories();


                // Resolve Promises
                    const productsData = getProductsPromise.data;
                    const carrouselData = getCarrouselProductsPromise.data;



                // Merge Colors and Projects
                    const productsWithColor = this.mergeProductsAndColors(productsData, SPColorsCategories);


                // Store Results

                this.setState( {
                    currentCategory : `${startCase(topicName)}  Products`,
                    products : productsWithColor || [],
                    carrouselproducts : carrouselData || [],
                    isLoaded : true
                })
            }


            // --------------------------------------
            // Load SP Categories
            // --------------------------------------
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


            // --------------------------------------
            // Merge Products & Categories
            // --------------------------------------
            mergeProductsAndColors(productsData, SPColorsCategories)
            {
                const productsWithColor = productsData.map((product)=> {
                    SPColorsCategories.map((spColor)=> {
                        if(product.SoftwareTopic === spColor.name) {
                            product.color = spColor.color
                        }
                    })

                    return product;
                })


                return productsWithColor
            }


             /** --------------------------------------
            // Get Colors
            // @returns {A Promise Object}
            // --------------------------------------*/
            async getColors(returnArray) {
                console.time("concatenation");
                const baseColor = '#1197D3';
                const getColorsPromise = await axios.get(Endpoints.getSideBarColorsSP)
                const getColorsResponse =  await getColorsPromise.data.value;
                const category = this.splitRouteName();
                // console.log('category', category);

            
                const colorsArray = (getColorsResponse.filter((color)=> {
                        return category == color.Title
                }));

                // Return all the Colors or just the Color Value

                if(returnArray)
                    return colorsArray;
                else
                    return ( colorsArray.length > 0 ? colorsArray[0].Color : baseColor);
                
            }


        /* ==========================================================================
         *  Render Logic and State Handle
         ========================================================================== */



            // --------------------------------------
            // Get Route Params and change 
            // Current Category from the view
            // --------------------------------------
            splitRouteName() {
                const {topic} = this.props.match.params
                return topic;
            }


            // --------------------------------------
            // Set Fist Uppercase and remove -
            // --------------------------------------
            formatTitle(routeName) {
                const title = startCase( replace(routeName [routeName.length - 1]), '-' , '');
                return title === 'Catalogue' ?  "All" :  title
            }
            
            
            // --------------------------------------
            // Shuffle Cards
            // --------------------------------------
            shuffle = () => {
                this.setState(({ products }) => ({
                    products: shuffle(products)
                }));
            }


        /* ==========================================================================
         *  Render Methods
         ========================================================================== */


            // --------------------------------------
            // Render Dashboard
            // --------------------------------------
            renderDashboard() {        
                return (
                    <Fragment>
                            { this.props.location.pathname.indexOf('/catalogue/all/all') >= 0 && this.renderCarrousel()}
                            {this.renderFlipperBody()}
                    </Fragment>
                )

            }


            // --------------------------------------
            // Render ALl Products View
            // --------------------------------------
            renderHomePageView() {
                this.renderCarrousel();
                this.renderFlipperBody();
            }


            // --------------------------------------
            // Render Slick Carrousel
            // --------------------------------------
            renderCarrousel() {
                const {carrouselproducts} = this.state;
                const itemsToShow = carrouselproducts.length;
                return (
                    <div className="row xpl-carrouselRow">
                        <div className="col-lg-12">
                            <h3 className="xpl-row xpl-allAppTitle"> What's New? </h3>
                            <Carrousel carrouselData = {carrouselproducts} itemsToShow = {itemsToShow} />
                        </div>
                    </div>
                )
            }


            // --------------------------------------
            // Render All Products
            // --------------------------------------
            renderAllProducts() {
                const {currentCategory, products} = this.state;

                return (
                    <Fragment>
                        <div className="row xpl-row">
                            <div className="col-lg-12">
                                <h3 className="xpl-allAppTitle">{currentCategory}</h3>
                            </div>
                        </div>

                        <ProjectsHolder 
                            productsData = {products} 
                            currentCategory = {currentCategory} 
                            shuffle = {this.shuffle} />
                            
                            
                    </Fragment>
                );
            }


            renderFlipperBody() {
                
                const {currentCategory, products} = this.state;
                return (
                    <Fragment>
                        <div className="row xpl-row">
                            <div className="col-lg-12">
                                <h3 className="xpl-allAppTitle">{currentCategory}</h3>
                            </div>
                        </div>

                        <ProjectsHolder productsData = {products} currentCategory = {currentCategory} shuffle = {this.shuffle} />

                    </Fragment>
                );
            }




            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader/> </div>
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state
                return isLoaded ? this.renderDashboard() : this.renderLoader()
            }
    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;
