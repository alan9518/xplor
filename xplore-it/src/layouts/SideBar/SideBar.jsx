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

// --------------------------------------
// Create Component Class
// --------------------------------------
    class SideBar extends Component {


        // --------------------------------------
        // Render SidebarLinks
        // Map Routes
        // --------------------------------------
        // renderLinks() {
        //     const {routes} =  this.props;
        //     routes && routes.length > 0
        //         return (
        //             routes.map((route) => {
        //                 if(route.sidebarName)
        //                 {
        //                     return (
        //                         <SideBarLink 
        //                             key = {`link-${route.key}`}
        //                             indexKey = {route.key} 
        //                             title = {route.sidebarName} 
        //                             Link = {route.path}
        //                             icon = {route.icon}
        //                         />
        //                     )
        //                 }
        //             })
        //         )
        // }

        // --------------------------------------
        // Render Sidebar 
        // --------------------------------------
        renderSideBar() {
            return (
                <React.Fragment>
                <div className="xpl-sidebarBody">
                    <div className="xpl-sidebarTitleContainer">
                        {/* <h2 className="xpl-sidebarTitle">{this.props.logoText}</h2> */}
                        Sidebar
                    </div>
                    
                    <div className="xpl-sidebarLinksContainer">
                        <ul className = "xpl-linksList">
                            {/* {this.renderLinks()} */}
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
