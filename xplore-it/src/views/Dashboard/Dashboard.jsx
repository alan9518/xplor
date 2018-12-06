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
        HeaderButton,
        ToggleButton,
        ProjectCard,
        Carrousel,
        ProjectsHolder,
        AppLoader, 
    } from "../../components";
    
    import {shuffle, startCase, replace} from "lodash";
    import InfiniteScroll from 'react-infinite-scroller';
    import {Endpoints} from '../../services/endpoints';

    import axios from 'axios';
    import { Server } from "https";


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

        // {
        //     projectID : 1, 
        //     projectTitle : 'Project 1',
        //     projectCategory : 'Enviroment',
        //     projectIcon : 'fab fa-accusoft',
        //     projectLink : '/app/details/',
        //     projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
        //     projectCarrousel : true,
        // },

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

                // Get All Products. Createn Promise 
                const getProductsPromise = topicName === 'all' 
                    ? await axios.get(Endpoints.getAllProducts) 
                    : await axios.get(Endpoints.getAllProductsByCategory,{params});

                // Resolve Promises
                const productsData = getProductsPromise.data;
                const carrouselData = getCarrouselProductsPromise.data;

                this.setState( {
                    currentCategory : `${startCase(topicName)}  Products`,
                    products : productsData,
                    carrouselproducts : carrouselData,
                    isLoaded : true
                })
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
                const Context = React.createContext();
                const categoryColor = '#';
                // console.log('context', context);               
                return (
                    <Fragment>
                            { this.props.location.pathname === '/catalogue/all/all' && this.renderCarrousel()}
                            {this.renderFlipperBody()}
                    </Fragment>
                )

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
            // Render Cards use React Flip
            // For Cards Sorting
            // --------------------------------------
            renderFlipperBody() {
                
                const {currentCategory, products} = this.state;
                
                return (
                    <Fragment>
                        <div className="row xpl-row">
                            <div className="col-lg-12">
                                <h3 className="xpl-allAppTitle" onClick = {this.shuffle}>{currentCategory}</h3>
                            </div>
                        </div>

                        <ProjectsHolder productsData = {products} currentCategory = {currentCategory} shuffle = {this.shuffle} />

                    </Fragment>
                );
            }


    

            // --------------------------------------
            // Render Body With Dummy Layout
            // --------------------------------------
            renderDummyBody() {
                return (
                <Fragment>
                    <div className="row xpl-carrouselRow">
                        <div className="col-lg-12">
                            <h3 className="xpl-row xpl-allAppTitle"> What's New? </h3>
                            <Carrousel />
                        </div>
                    </div>

                    <div className="row xpl-row">
                        <div className="col-lg-12">
                            <h3 className="xpl-allAppTitle"> All Apps </h3>
                        </div>

                    
                        
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {1} hasSmallDescription={true} />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {2} hasSmallDescription={true} />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {4} hasSmallDescription={true} />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {4} hasSmallDescription={true} />
                            </div>
                        
                    </div>
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
