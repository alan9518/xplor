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
                currentMenu.map((menuItem, key)=> {
                    menuItemPath = menuItem.subCategories && menuItem.subCategories.length > 0 ? null : menuItem.path;
                    console.log('menuItemPath', menuItemPath);
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
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return  <ul className = "xpl-linksList">{this.renderMenuList()}</ul> 
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
