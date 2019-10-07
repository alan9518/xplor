/* ==========================================================================
 * Main Dashboard Template View
 * Add Here all the Components that will show on the main Panel
 * Show All Projects
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import {
        Carrousel,
        ProjectsHolder,
        AppLoader, 
        ProjectLink,
        AppButton,
        ErrorBoundary
    } from "../../components";

    import {shuffle, startCase, replace} from "lodash";
    import {Endpoints} from '../../services/endpoints';
    import axios from 'axios';
    import {Config} from '../../Config';
    const {Bussmodel} = Config // ? Host Path

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
                currentCategory : 'All Products',
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
                // const params = {Bussmodel : Bussmodel, customerid : this.props.match.params.key}
                // const globalParams = {Bussmodel: Bussmodel};
                try {
                    // Get Carrousel Products. Create Promise
                        const getCarrouselProductsPromise =  axios.get(Endpoints.getCarrouselProducts,{params: {Bussmodel: Bussmodel}});

                        // Get All Products. Createn Promise 
                        // Lok for /sub on URL if true then query subCategories
                            const getProductsPromise = topicName === 'all' 
                                ? axios.get(Endpoints.getAllProducts,{params: {Bussmodel: Bussmodel}})
                                : this.findSubFilterRoute();
    
                                // axios.get(Endpoints.getAllProductsByCategory,{params:{Bussmodel : Bussmodel, customerid : this.props.match.params.key}})
                        // Resolve all Promises
                            const [carrouselProductsData, homeProductsData ] = await Promise.all([getCarrouselProductsPromise, getProductsPromise]);

                            const SPColorsCategories =  await this.loadSPCategories();
    
                        // Merge Colors and Projects
                            const productsWithColor = this.mergeProductsAndColors(homeProductsData.data, SPColorsCategories);   
                            
                        // Merge Colors and Carrousel Projects
                            const carrouselProductsWithColor = this.mergeProductsAndColors(carrouselProductsData.data, SPColorsCategories);   
							console.log('​Dashboard -> loadProjects -> carrouselProductsWithColor', carrouselProductsWithColor)
    
                        // Store Results
                        this.setState( {
                            currentCategory : `${startCase(topicName)}  Products`,              
                            products : productsWithColor || [],
                            carrouselproducts : carrouselProductsWithColor || [],
                            isLoaded : true
                        });
                }

                catch (error) {
					console.log("​Dashboard -> catch -> error", error)
                    this.setState({isLoaded : false })
                }
            
            }


            // --------------------------------------
            // Lok for /sub on URL 
            // if true then query subCategories
            // else filter by Category
            // --------------------------------------
            findSubFilterRoute() {
                const url =  window.location.href;
                if(url.indexOf('/sub') >= 0)
                return axios.get(Endpoints.getAllProductsBySubCategory,{params:{subcap : this.props.match.params.key, Bussmodel : Bussmodel, category : this.props.match.params.topic}})
                else
                    return axios.get(Endpoints.getAllProductsByCategory,{params:{Bussmodel : Bussmodel, category : this.props.match.params.topic}})
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
                const title = startCase( replace(routeName[routeName.length - 1]), '-' , '');
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
            // Render Carrousel if user is in Home Page
            // --------------------------------------
            renderDashboard() {        
                return (
                    <Fragment>
                        <ErrorBoundary>
                            { this.props.location.pathname.indexOf('/catalogue/all/all') >= 0 && this.renderCarrousel()}
                            {this.renderFlipperBody()}
                        </ErrorBoundary>
                    </Fragment>
                )

            }


            // --------------------------------------
            // Render All Products View
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
                      {
                        itemsToShow > 0 && 
                            <div className="col-lg-12">
                                <div className="xpl-headerContainer">

                                        <h3 className="xpl-row xpl-allAppTitle" style = {{marginLeft:0}}> What's New? </h3>
                                       {
                                            localStorage.getItem('xplorITOwner') !== null &&
                                                <ProjectLink route = {'addProject/'} spRoute = {true}>
                                                    <AppButton 
                                                        buttonClass = {'xpl-addNewAppButton'} 
                                                        onClick =  {this.toggleModal}
                                                        buttonText = {'Add New Product'} 
                                                        iconClass = {'fas fa-plus-circle'} 
                                                    /> 
                                                </ProjectLink>
                                        }
                                </div>
                                
                                <Carrousel carrouselData = {carrouselproducts} itemsToShow = {itemsToShow} />
                            </div>
                      }
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

            // --------------------------------------
            // Show All Cards
            // Flipper takes care of the Animation
            // --------------------------------------
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
