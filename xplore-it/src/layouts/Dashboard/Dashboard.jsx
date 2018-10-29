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
    import {SideBar} from '../../components';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../styles.css'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {

    // --------------------------------------
    // Render App
    // Render the DashBoard Routes from routes.js
    // --------------------------------------    
        renderApp() {
            return (
                <Fragment>

                    <header>
                        <div className="xpl-appHeader">
                            header navBar
                        </div>
                    </header>
                    
                    <div className="App xpl-mainContainer" >

            
                        <div className="xpl-appSideBar">
                            {/* <div className="toggle-btn">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div> */}
                            <SideBar logoText = {'XploreIT'}  routes = { dashboardRoutes }  />
                        </div>


                        {/* Iterate Routes to set the Body Content */}
                        <div className="xpl-appBody">

                         
                            
                                <Switch>
                                {
                                    dashboardRoutes.map((prop)=> {
                                        if(prop.redirect)
                                            return <Redirect from={prop.path} to={prop.to} key={`red-${prop.key}`} />;
                                        return <Route 
                                                    exact = {prop.exact}
                                                    path = {prop.path}
                                                    component = {prop.component}
                                                    key = {prop.key}  
                                                />;
    
                                    })
                                }
                                </Switch>
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
