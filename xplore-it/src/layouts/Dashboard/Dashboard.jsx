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
    import { HeaderButton, ToggleButton, AppButton,  SideBar, NavBar, AppModal} from '../../components'
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../styles.css';
    import logo from '../../images/logo/Flex_WHT_Med_r.png';

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
                showMobileMenu : false,
                showModal : false,
            }
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
        // Render App
        // Render the DashBoard Routes from routes.js
        // --------------------------------------    
            renderApp() {
                const {showMobileMenu, showModal} =  this.state;
                const currentNavigator = window.navigator.appName;
                const bodyClasses = currentNavigator === "Microsoft Internet Explorer" ? "xpl-content main xpl-contentIE" : "xpl-content main";
                return (
                    <Fragment>

                        <header>
                            <NavBar logo = {logo}/>
                        </header>

                        <AppModal show={showModal} handleClose = {this.toggleModal} >  Modal oCon  </AppModal>

                        <div className="App xpl-mainContainer" >

                            <SideBar routes = { dashboardRoutes }  showMobileMenu = {showMobileMenu} onClick = {this.toggleMobileMenu }/>


                            {/* Iterate Routes to set the Body Content */}
                            <div className={bodyClasses}>

                            
                                <div className="container-fluid">
                                    <div className="xpl-buttonContainer">
                                        <AppButton 
                                                buttonClass = {'xpl-toggleButton'} 
                                                onClick = {this.toggleMobileMenu } 
                                                iconClass = {'fas fa-bars'}
                                        />

                                        <AppButton 
                                            buttonClass = {'xpl-addNewAppButton'} 
                                            onClick =  {this.toggleModal}
                                            buttonText = {'Add New Item'} 
                                            iconClass = {'fas fa-plus-circle'} 
                                        />
                                    </div>


                                        {
                                            // Set Routes and Connect it with the Views
                                                <Switch>
                                                    {dashboardRoutes.map((prop,key) => {
                                                        if (prop.redirect)
                                                            return <Redirect from={prop.path} to={prop.to} key={key} />;
                                                        
                                                        return <Route 
                                                                    exact={prop.exact} 
                                                                    path={prop.path} 
                                                                    component={prop.component} 
                                                                    key={prop.key} />;
                                                    })}
                                                </Switch>
                                        }

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
                return this.renderApp()
            }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;
