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
    import { AppButton,  SideBar, NavBar,AppLoader, NoData, ProjectLink} from '../../components';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../styles.css';
    import logo from '../../images/logo/logo.png';
    import axios from 'axios';
    import {TransitionGroup,CSSTransition} from 'react-transition-group';
    import {Endpoints} from '../../services/endpoints';
    import {Config} from '../../Config';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';


    
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
                responsiveWidth : window.innerWidth,
                filterRoutes : '',
                isOwner : false
            }
            this.path = Config.spPath;

        }

        // --------------------------------------
        // Load API & Register Window Listener
        // Event for Responsive Sharepoint
        // --------------------------------------
        componentDidMount() {
            this.loadAPI();
            window.addEventListener("resize", this.updateContainerDimensions);
        }


        // --------------------------------------
        // Unregister Window Listener Event
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
            try {
                // Get API Routes
                const apiRoutesPromise = this.loadAPICategories();
                // Get SP Routes
                const SPRoutesPromise =  this.loadSPCategories();
                // Get XplorIT Owners
                const getXplOwnsersPromise = this.loadxplorITOwners();

                // Resolve Both Promises
                const [apiRoutes, SPRoutes, ownsersData] = await Promise.all([apiRoutesPromise,SPRoutesPromise,getXplOwnsersPromise]);
                
                // Get Routes Values
                const apiRoutesData =  apiRoutes.data;

                // Prepare SP Routes
                const SPRoutesData = this.createSPArray(SPRoutes.data.value);

                let isOwner = this.setOwnersList(ownsersData.data.value);

                // Merge SP And API Routes
                const appRoutes = this.mergeRoutes(apiRoutesData, SPRoutesData, isOwner);

                // const ownersList = ownsersData.data;


                


                this.setState({
                    categories : appRoutes || [],
                    isOwner : isOwner,
                    isLoaded : true,
                    showError : false,
                })
                
            

            }
            catch(error) {
				console.log('​Dashboard -> catch -> error', error)
                this.setState({isLoaded : true, showError : true})
            }
        }



        // --------------------------------------
        // Load WebService Categories
        // --------------------------------------
        loadAPICategories() {
            const params = {Bussmodel: 'XPLOR'}
            return axios.get(Endpoints.getAllCategories, {params});
        }   


        // --------------------------------------
        // Load SP Categories
        // --------------------------------------
        loadSPCategories() {
            return axios.get(Endpoints.getSideBarCategoriesSP);
        }

        // --------------------------------------
        // Load XplorIT Owners
        // --------------------------------------
        loadxplorITOwners() {
            return axios.get(Endpoints.getXplorITOwners);
        }


        // --------------------------------------
        // Create An Array with The SP Categories
        // --------------------------------------
        createSPArray(SPCategories) {
            const SPCatsArray = (SPCategories.map((SpCat)=> {
                return {
                    color : SpCat.Color,
                    name : SpCat.Title,
                    order: SpCat.Order1
                }
            }));


    
            return (SPCatsArray);
        }


       

        
        /** --------------------------------------
        // Combine Routes Arrays
        // @param {APIRoutes <Array>}
        // @param {SPRoutes <Array>}
        // --------------------------------------*/
        mergeRoutes(APIRoutes, SPRoutes, isOwner) {

            const homeRoute = {
                    path : `catalogue/all/all`,
                    exact: false,
                    sidebarName : 'Home',
                    key:'home-route',
                    color : '#1197D3',
                    homeIcon : 'fas fa-home',
                    order : 0
            }

            const addProjectRoute = {
                path : `addProject`,
                sidebarName : isOwner === true ? 'Add Product' : null,
                exact: true,
                key:`app-route-addProduct`,
                color : '#1197D3',
                addProjectIcon : 'fas fa-folder-plus'
        }
            try {
                const appRoutes = APIRoutes.map((apiRoute) => {

                    // Add React Routes Keys
                    apiRoute.path =  `catalogue/${apiRoute.CustomerName}/${apiRoute.CustomerID}`;
                    apiRoute.exact = false;
                    apiRoute.sidebarName = apiRoute.CustomerName

                    // Add Color and Order if the Routes have the same name from both arrays

                    for(let SPRoute of SPRoutes) {
                        if(apiRoute.CustomerName === SPRoute.name) {
                            apiRoute.color = SPRoute.color;
                            apiRoute.order = SPRoute.order
                        }
                    }

                    return apiRoute;

                });

                // Return All Routes, On an Array Merging The HomeRoute
                const sideBarRoutes = [homeRoute, addProjectRoute, ...appRoutes ];
                return sideBarRoutes;

            }
            catch(error) {
                // const appRoutes = [];
                this.setState({isLoaded : true, showError : true})

                // Return The Array with Only the HomeRoute
                return [...homeRoute];
            }

        }


        /** --------------------------------------
        // Set Owners Data and Save it on 
        // Session Storage
        // @param {APIRoutes <Array>}
        // --------------------------------------*/
        setOwnersList(ownersData) {
            const user = window.getCurrentSPUser();
            // let ownerObject = {}


            let xplorITOwner = ownersData.filter((owner)=> {return owner.Email === user.user_email })[0]

            if(xplorITOwner) {
                if(localStorage.getItem('xplorITOwner') === null) {
                    window.localStorage.setItem('xplorITOwner', JSON.stringify(user))
                }

                return true
            }
          
            else {
                if(localStorage.getItem('xplorITOwner') !== null) {
                    window.localStorage.removeItem('xplorITOwner')
                }

                return false

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
        

        // --------------------------------------
        // Filter Routes Based on Parent Category
        // --------------------------------------
        filterRoutesByCategory = (event) => (categoriesFromSidebar) => {
            console.log('TCL: Dashboard -> filterRoutesByCategory -> categoriesFromSidebar', categoriesFromSidebar)
            console.log('TCL: Dashboard -> filterRoutesByCategory -> this.state', this.state)

            this.setState({filterRoutes : categoriesFromSidebar});
            // const filteredCategories = categoriesFromSidebar.filter((category) => {
            //     return 
            // })

            // const {categories} =  this.state;
			
			// console.log('TCL: Dashboard -> filterRoutesByCategory -> categories', categories)
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
        renderErrorPage(responsiveWidth) {
            return(
                <div  style = {{maxWidth:responsiveWidth}}>
                    <NoData message = {"We Can't Connect to the Server."} />
                </div>
            )
        }


        // --------------------------------------
        // Render App
        // Render the DashBoard Routes from routes.js
        // --------------------------------------    
            renderApp() {
                const {showMobileMenu, categories,  showError, responsiveWidth} =  this.state;
                const {location} = this.props;
                const currentNavigator = window.navigator.appName;
                const bodyClasses = currentNavigator === "Microsoft Internet Explorer" 
                                                        ? "xpl-content main xpl-contentIE" 
                                                        : "xpl-content main";
                if(showError)
                    return this.renderErrorPage(responsiveWidth);
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
                                        onFilterRoutesClick = {this.filterRoutesByCategory}
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

                                            <Alert stack={{limit: 1}}  timeout={2000} />
                                        
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



