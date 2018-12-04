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
    import { HeaderButton, MaterialButton, AppButton,  SideBar, NavBar, AppModal, NewProject, HistoryList} from '../../components';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../styles.css';
    import logo from '../../images/logo/Flex_WHT_Med_r.png';
    import {TransitionGroup,CSSTransition} from 'react-transition-group';

    
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
            }

        }


        // --------------------------------------
        // Hide Loading 
        // --------------------------------------
        componentDidMount() {
            this.setState({
                isLoaded : true,
            })
        }

        // --------------------------------------
        // Show/Hide Mobile Menu
        // --------------------------------------
        toggleMobileMenu = (e) => {
            const {showMobileMenu} = this.state;
            this.setState({
                showMobileMenu : !showMobileMenu
            })
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
        // Render App
        // Render the DashBoard Routes from routes.js
        // --------------------------------------    
            renderApp() {
                const {showMobileMenu, showModal, currentColor} =  this.state;
                const {location} = this.props;
                const currentNavigator = window.navigator.appName;
                const bodyClasses = currentNavigator === "Microsoft Internet Explorer" 
                                                        ? "xpl-content main xpl-contentIE" 
                                                        : "xpl-content main";
                return (
                    <Fragment>

                        <header>
                            <NavBar logo = {logo}/>
                        </header>

                        {/* 
                            // --------------------------------------
                            // Modal Window
                            // --------------------------------------    

                                <AppModal 
                                    show={showModal} 
                                    handleClose = {this.toggleModal} 
                                    modalTitle = {"Add New or Refreshed Items to the Library"} 
                                >  

                                    <NewProject key = {'ModalBody'}/>
                                    <HistoryList key = {'ModalFooter'}/>
                            
                                </AppModal> 
                        */}

                        <div className="App xpl-mainContainer" >


                            <SideBar 
                                routes = { dashboardRoutes }  
                                showMobileMenu = {showMobileMenu} 
                                onClick = {this.toggleMobileMenu }
                            />


                            {/* Iterate Routes to set the Body Content */}
                            <div className={bodyClasses}>
                                <div className="container-fluid">
                                    <div className="xpl-buttonContainer">
                                        <AppButton 
                                                buttonClass = {'xpl-toggleButton'} 
                                                onClick = {this.toggleMobileMenu } 
                                                iconClass = {'fas fa-bars'} 
                                        />

                                        {/* 
                                            // --------------------------------------
                                            // Modal Window Button
                                            // -------------------------------------- 
                                            <AppButton 
                                                buttonClass = {'xpl-addNewAppButton'} 
                                                onClick =  {this.toggleModal}
                                                buttonText = {'Add New Item'} 
                                                iconClass = {'fas fa-plus-circle'} 
                                            /> 
                                        */}
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
        // Render Component
        // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                return isLoaded ? this.renderApp() : null
            }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;
