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
    import { HeaderButton, ToggleButton,  SideBar, NavBar} from '../../components'
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
        // Render App
        // Render the DashBoard Routes from routes.js
        // --------------------------------------    
            renderApp() {
                const {showMobileMenu} =  this.state;
                console.log('showMobileMenu', showMobileMenu);
                const currentNavigator = window.navigator.appName;
                const bodyClasses = currentNavigator === "Microsoft Internet Explorer" ? "xpl-content main xpl-contentIE" : "xpl-content main";
                return (
                    <Fragment>

                        <header>
                            <NavBar logo = {logo}/>
                        </header>
                        
                        <div className="App xpl-mainContainer" >

                            <SideBar routes = { dashboardRoutes }  showMobileMenu = {showMobileMenu} onClick = {this.toggleMobileMenu }/>


                            {/* Iterate Routes to set the Body Content */}
                            <div className={bodyClasses}>

                            
                                <div className="container-fluid">
                                    <div className="xpl-buttonContainer">
                                        <ToggleButton onClick = {this.toggleMobileMenu } />
                                        <HeaderButton/>
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
