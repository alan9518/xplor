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
    import { SingleList, DetailsList, Search, CloseButton,  } from "../../components";

// --------------------------------------
// Create Component Class
// --------------------------------------
    class SideBar extends Component {


        // --------------------------------------
        // Init Component
        // --------------------------------------
        constructor(props) {
            super(props);
            this.routes =  this.props.routes;
            this.state = {
                currentMenu : props.routes,
                menuComponent : 'singleList',
                currentCategory : null,
                currentCategoryColor : null,
            }
        }


        // --------------------------------------
        // Show/Hide Mobile Menu
        // --------------------------------------
        toggleMobileMenu = (e) => {
            this.setState((prevState) => {
                return {
                    showMobile : !prevState.showMobile
                }
            })
        }


        // --------------------------------------
        // Change To Single List Menu
        // --------------------------------------
        onListItemBackClick = (e) => {
            this.setState({
                currentMenu: this.routes,
                menuComponent : 'singleList'
            })
        }


        // --------------------------------------
        // Open SubMenu
        // --------------------------------------

        onListItemClick = (menu) =>  {
            const {subCategories, sidebarName, color } = menu;
            
            this.setState((prevState) => {
                return {
                    currentCategory: sidebarName,
                    menuComponent : 'detailsList',
                    currentCategoryColor : color,
                    currentMenu: subCategories,
                    
                };
            });
            
        }

        // 52 33 3669 7000


        // --------------------------------------
        // Render Sidebar 
        // --------------------------------------
        renderSideBar() {
            const {currentMenu, menuComponent, currentCategory, currentCategoryColor} = this.state;
            const {showMobileMenu,onClick} = this.props;
            console.log('this.props', this.props);
            const sidebarClass = showMobileMenu === true?  'showMobileMenu' : null;
            return (
                <React.Fragment>

                    <div className = {`xpl-appSideBar ${sidebarClass}`}>
                        
                        <div className="xpl-appSideBarBody">
                            <div className="xpl-appSideBarHeader">
                                <div className="xpl-buttonCloseContainer">
                                    <CloseButton onClick = {onClick}/>
                                </div>
                                <Search/>
                            </div>
                            
                            <div className="xpl-appSideBarLinksContainer">

                                { 
                                    menuComponent === 'singleList' && 
                                    <SingleList currentMenu = {currentMenu} 
                                                onClick = {this.onListItemClick}
                                    /> 
                                }
                                { 
                                    menuComponent === 'detailsList' && 
                                                <DetailsList  
                                                    currentMenu = {currentMenu} 
                                                    currentCategory = {currentCategory} 
                                                    currentCategoryColor = {currentCategoryColor} 
                                                    onClick = {this.onListItemBackClick}
                                    /> 
                                }
                                
                            </div>
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
