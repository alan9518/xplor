/* ==========================================================================
 * Single Menu List Component
 * Render Categories Sidebar Menu
 * 31/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
    import { SideBarLink } from "../../components";



// --------------------------------------
// Create Component Class
// --------------------------------------
    class SingleList extends Component {


        // --------------------------------------
        // Open the Details List 
        // Check if the Item Has Subcat and change
        // Parent State
        // --------------------------------------
        onItemClick = (menu) => (e)=> {
            this.props.onClick(menu);
        }

        // --------------------------------------
        // Iterate Routes and Render
        // --------------------------------------
        renderMenuList() {
            const {currentMenu}  = this.props;
            let menuItemPath = null;
            return (
                <ReactCSSTransitionGroup
                transitionName="xpl-listItemsAnimation"
                transitionEnterTimeout = { 500 }
                transitionLeaveTimeout = { 300 }
            >
                {
                    currentMenu.map((menuItem, key)=> {
                        menuItemPath = menuItem.subCategories && menuItem.subCategories.length > 0 ? null : menuItem.path;

                        if(menuItemPath!== null) {
                            return ( 
                                <SideBarLink 
                                    key = { menuItem.key } 
                                    indexKey = {`link-${key}`} 
                                    title = { menuItem.sidebarName } 
                                    link = { menuItemPath } 
                                    color = { menuItem.color } 
                                    hasIcon =  {true}
                                    
                                />
                            )
                        }
                        else
                        {
                            return ( 
                                <SideBarLink 
                                    key = { menuItem.key } 
                                    indexKey = {`link-${key}`} 
                                    title = { menuItem.sidebarName } 
                                    link = { menuItemPath } 
                                    color = { menuItem.color } 
                                    hasIcon =  {true}
                                    onClick =  {this.onItemClick(menuItem)}
                                />
                            )
                        }
                    })
                }
                </ReactCSSTransitionGroup>
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return  (
               
                    <ul className = "xpl-linksList">{this.renderMenuList()}</ul>
                
            ) 
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    SingleList.propTypes = {
        currentMenu: PropTypes.array
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default SingleList;
