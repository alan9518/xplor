/* ==========================================================================
 * SideBar Component Layout 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import { SideBarLink, Search } from "../../components";

// --------------------------------------
// Create Component Class
// --------------------------------------
    class SideBar extends Component {


        // --------------------------------------
        // Render SidebarLinks
        // Map Routes
        // --------------------------------------
        renderLinks() {
            const {routes} =  this.props;
                return (
                    routes.length > 0 &&
                        routes.map((route) => {
                            if(route.sidebarName)
                            {
                                return (
                                    <SideBarLink 
                                        key = {`link-${route.key}`}
                                        indexKey = {route.key} 
                                        title = {route.sidebarName} 
                                        Link = {route.path}
                                        color = {route.color}
                                    />

                                )
                            }
                        })
                )
        }

        // --------------------------------------
        // Render Sidebar 
        // --------------------------------------
        renderSideBar() {
            const {logoText} = this.props;
            return (
                <React.Fragment>
                <div className="xpl-appSideBarBody">
                    
                    <Search/>
                    
                    <div className="xpl-appSideBarLinksContainer">
                        
                        <ul className = "xpl-linksList">
                            {this.renderLinks()}
                        </ul>
                    </div>
                </div>
            

            </React.Fragment>
            )
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderSideBar();
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    SideBar.propTypes = {
        routes : PropTypes.array
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default SideBar;
