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
    import {SideBar, NavBar} from '../index';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../styles.css';
    import logo from '../../images/logo/Flex_WHT_Med_r.png';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {
        

    // --------------------------------------
    // Render App
    // Render the DashBoard Routes from routes.js
    // --------------------------------------    
        renderApp() {
            const currentNavigator = window.navigator.appName;
            let bodyClasses = null;
            if(currentNavigator === "Microsoft Internet Explorer")
                bodyClasses = "xpl-content main xpl-contentIE"
            else
                bodyClasses = "xpl-content main";

            return (
                <Fragment>

                    <header>
                        <NavBar logo = {logo}/>
                    </header>
                    
                    <div className="App xpl-mainContainer" >

            
                        <div className="xpl-appSideBar">
                            <SideBar logoText = {'XploreIT'}  routes = { dashboardRoutes }  />
                        </div>


                        {/* Iterate Routes to set the Body Content */}
                        <div className="xpl-content">

                                {/* <Switch>
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
                                </Switch> */}


                                <div className = {bodyClasses}>
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
