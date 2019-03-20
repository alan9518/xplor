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
    // import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
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
            // console.log('this.props.onClick', this.props.onClick);



            // this.props.hideMobileMenu();
        }


        // --------------------------------------
        // Hide SidebarMenu from then Parent
        // --------------------------------------
        hideMobileMenu = (e) => {
            const {hideMobileMenu} = this.props;

            hideMobileMenu(e);
        }

        // --------------------------------------
        // Iterate Routes and Render
        // menuItemPath : if the link has a path
        // return a React Router Link
        // else a button to open Details
        // --------------------------------------
        renderMenuList() {
            const {currentMenu}  = this.props;
            let menuItemPath = null;
            return (
                
                    currentMenu.map((menuItem, key)=> {
                    

                        if(menuItem.sidebarName ) 
                        {   
                            // Check if the Item has SubMenu
                            // If it has return Null
                            // Else the Return the Path From SideBar
                            menuItemPath = menuItem.SubCap && menuItem.SubCap.length > 0 ? null : menuItem.path;
                
                            if(menuItemPath!== null) {

                                // look For Home Route

                                if(menuItem.homeIcon) {
                                    return ( 
                                        <SideBarLink 
                                            key = { menuItem.key } 
                                            indexKey = {`link-${key}`} 
                                            title = { menuItem.sidebarName } 
                                            link = { menuItemPath } 
                                            color = { menuItem.color } 
                                            hasIcon =  {true}
                                            homeIcon = {menuItem.homeIcon}
                                            hideMobileMenu = {this.hideMobileMenu}  
                                        />
                                    ) 
                                }
                                // Other Routes

                                else {
                                    return ( 
                                        <SideBarLink 
                                            key = { menuItem.key } 
                                            indexKey = {`link-${key}`} 
                                            title = { menuItem.sidebarName } 
                                            link = { menuItemPath } 
                                            // link = { `${menuItemPath}/sub` } 
                                            color = { menuItem.color } 
                                            hasIcon =  {true}
                                            hideMobileMenu = {this.hideMobileMenu}  
                                        />
                                    )
                                }
                                
                            }
                            // Menu Without Children
                            else
                            {
                                return ( 
                                    <SideBarLink 
                                        key = { menuItem.key } 
                                        indexKey = {`link-${key}`} 
                                        title = { menuItem.sidebarName } 
                                        link = { menuItemPath } 
                                        hasSub = {true}
                                        // link = { `${menuItem.path}/sub` } 
                                        color = { menuItem.color } 
                                        hasIcon =  {true}
                                        onClick =  {this.onItemClick(menuItem)}
                                    />
                                )
                            }
                        }
                        
                    })
                
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
