/* ==========================================================================
 * Content Layout
 * Add All Layout Components
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { Switch, Route, Redirect } from 'react-router-dom';
    import dashboardRoutes from '../../routes/routes';
    import { AppButton,  SideBar, NavBar,AppLoader, NoData} from '../../components';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../styles.css';
    import logo from '../../images/logo/logo.png';
    import axios from 'axios';
    import {sortBy, shuffle} from 'lodash';
    import {TransitionGroup,CSSTransition} from 'react-transition-group';
    import {Endpoints} from '../../services/endpoints';
    import {Config} from '../../Config';


    
// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {


        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                isLoaded : false,
                showMobileMenu : false,
                showModal : false,
                showError : false,
                responsiveWidth : window.innerWidth
            }
            this.path = Config.spPath;
            // this.updateContainerDimensions = this.updateDimensions.bind(this);

        }

        // --------------------------------------
        // Hide Loading 
        // --------------------------------------
        componentDidMount() {
            this.loadAPI();
            window.addEventListener("resize", this.updateContainerDimensions);
        }


        // --------------------------------------
        // Unregister Events
        // --------------------------------------
        componentWillUnmount() {
            window.removeEventListener("resize", this.updateContainerDimensions);
        }


    /* ==========================================================================
     *  API Connection
     ========================================================================== */

        // --------------------------------------
        // Handle all Requests
        // --------------------------------------
        async loadAPI() {
            const APIRoutes =  await this.loadAPICategories();
            const SPRoutes = await  this.loadSPCategories();


            const appRoutes = this.mergeRoutes(APIRoutes, SPRoutes);

            this.setState({
                categories : appRoutes || [],
                isLoaded : true,
                showError : false,
            })
        }

        // --------------------------------------
        // Load WebService Categories
        // --------------------------------------
        async loadAPICategories() {
            try {
                const getSoftwareTopicsPromise = await axios.get(Endpoints.getAllCategories);
                const softwareTopicsData =  await getSoftwareTopicsPromise.data;
                return softwareTopicsData;

            }
            catch (error) {
                this.setState({isLoaded : true, showError : true})
                return [];
            }
            

        }   


        // --------------------------------------
        // Load SP Categories
        // --------------------------------------
        async loadSPCategories() {
            try {
                const getSPCategoriesPromise = await axios.get(Endpoints.getSideBarCategoriesSP)
                const getSPCategoriesResponse =  await getSPCategoriesPromise.data.value;
                const SPCatsArray = (getSPCategoriesResponse.map((SpCat)=> {
                    return {
                        color : SpCat.Color,
                        name : SpCat.Title,
                        order: SpCat.Order1
                    }
                }));

                return (SPCatsArray);
            }
            catch (error) {
                this.setState({isLoaded : true, showError : true})
                return [];
            }
        }

        
        /** --------------------------------------
        // Combine Routes Arrays
        // @param {APIRoutes <Array>}
        // @param {SPRoutes <Array>}
        // --------------------------------------*/
        mergeRoutes(APIRoutes, SPRoutes) {

            const homeRoute = {
                    // path : `${this.path}/catalogue/all/all`,
                    path : `catalogue/all/all`,
                    exact: false,
                    sidebarName : 'Home',
                    key:'home-route',
                    color : '#1197D3',
                    homeIcon : 'fas fa-home',
                    order : 0
            }
            try {
                const appRoutes = APIRoutes.map((apiRoute) => {

                    // Add React Routes Keys
                    // apiRoute.path =  `${this.path}/catalogue/${apiRoute.CustomerName}/${apiRoute.CustomerID}`;
                    apiRoute.path =  `catalogue/${apiRoute.CustomerName}/${apiRoute.CustomerID}`;
                    apiRoute.exact = false;
                    apiRoute.sidebarName = apiRoute.CustomerName

                    // Add Color and Order
                    SPRoutes.map((SPRoute)=> {
                        if(apiRoute.CustomerName === SPRoute.name) {
                            apiRoute.color = SPRoute.color;
                            apiRoute.order = SPRoute.order
                        }

                    })

                    return apiRoute;

                });

                // Return All Routes, On an Array Merging The HomeRoute
                const sideBarRoutes = [homeRoute, ...appRoutes ];
                return sideBarRoutes;

            }
            catch(error) {
                // const appRoutes = [];
                this.setState({isLoaded : true, showError : true})

                // Return The Array with Only the HomeRoute
                return [...homeRoute];
            }

        }





    /* ==========================================================================
     *  Handle State
    ========================================================================== */


        // --------------------------------------
        // Show/Hide Mobile Menu
        // --------------------------------------
        toggleMobileMenu = (e) => {

            const {showMobileMenu} = this.state;
            try {
                this.setState({showMobileMenu : !showMobileMenu})
                e.preventDefault();
            }
        
            catch(error) {
                return null;
            }
        }


        // --------------------------------------
        // Show Modal
        // --------------------------------------
        toggleModal = (e) => {
            const { showModal } = this.state;
            this.setState({
                showModal : !showModal
            })
        }

        // --------------------------------------
        // Window Resizing
        // --------------------------------------
        updateContainerDimensions = () => {
            let newWidth = window.innerWidth;
            this.setState({responsiveWidth : newWidth});
        }
        


    /* ==========================================================================
     *  Render Methods
     ========================================================================== */

        // --------------------------------------
        // Render Routes
        // --------------------------------------

        renderRoutes(dashboardRoutes) {
            return (
                dashboardRoutes.map((prop,key)=> 
                    prop.redirect 
                    ? <Redirect from={prop.path} to={prop.to} key={key} /> 
                    : <Route  exact={prop.exact} path={prop.path} component={prop.component} key={prop.key}/>                  
                )
            )
        }


        // --------------------------------------
        // Render Error Page
        // --------------------------------------
        renderErrorPage() {
            return(
                <div>
                    <NoData message = {"We Can't Connect to the Server. Please Try Again Later"}/>
                </div>
            )
        }


        // --------------------------------------
        // Render App
        // Render the DashBoard Routes from routes.js
        // --------------------------------------    
            renderApp() {
                const {showMobileMenu, categories, currentColor, showError, responsiveWidth} =  this.state;
                const {location} = this.props;
                const currentNavigator = window.navigator.appName;
                const bodyClasses = currentNavigator === "Microsoft Internet Explorer" 
                                                        ? "xpl-content main xpl-contentIE" 
                                                        : "xpl-content main";
                if(showError)
                    return this.renderErrorPage();
                else
                    return (
                        <Fragment>
                                <header>
                                    <NavBar logo = {logo}/>
                                </header>

                                <div className="App xpl-mainContainer" >


                                    <SideBar 
                                        routes = { dashboardRoutes }  
                                        showMobileMenu = {showMobileMenu} 
                                        categories = {categories}
                                        onClick = {this.toggleMobileMenu }
                                        responsiveWidth = {responsiveWidth}
                                    />


                                    {/* Iterate Routes to set the Body Content */}
                                    <div className={bodyClasses}>
                                        <div className="container-fluid" style = {{maxWidth:responsiveWidth}}>
                                            <div className="xpl-buttonContainer">
                                                <AppButton 
                                                        buttonClass = {'xpl-toggleButton'} 
                                                        onClick = {this.toggleMobileMenu } 
                                                        iconClass = {'fas fa-bars'} 
                                                />

                                            </div>
                                                
                                                
                                            
                                            <TransitionGroup className="transition-group">
                                                <CSSTransition 
                                                            key={location.key} 
                                                            timeout={{ enter: 300, exit: 300 }} 
                                                            classNames="fade">
                                                
                                                        <Switch location = {location} >
                                                            {this.renderRoutes(dashboardRoutes)}
                                                        </Switch>
                                                </CSSTransition>
                                            </TransitionGroup>
                                        
                                        </div>
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
        // Render Component
        // -------------------------------------- 
            render() {
                const {isLoaded} = this.state;
                return isLoaded === true ? this.renderApp() : this.renderLoader();
            }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;



