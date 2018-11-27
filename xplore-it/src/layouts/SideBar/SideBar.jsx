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

    import { SingleList, DetailsList, Search, AppButton } from "../../components";

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
            console.log('this.props', this.props);
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


        // --------------------------------------
        // Render Sidebar 
        // --------------------------------------
        renderSideBar() {
            const {currentMenu, menuComponent, currentCategory, currentCategoryColor} = this.state;
            const {showMobileMenu,onClick} = this.props;
            const sidebarClass = showMobileMenu === true?  'showMobileMenu' : '';
            
            return (
                <Fragment>

                    <div className = {`xpl-appSideBar ${sidebarClass}`}>
                        
                        <div className="xpl-appSideBarBody">
                            <div className="xpl-appSideBarHeader">
                                <div className="xpl-buttonCloseContainer">
                                    <AppButton buttonClass = {'xpl-closeButton'} iconClass = {'fas fa-times'} onClick = {onClick}/>
                                </div>
                                <Search/>
                            </div>
                            
                            <div className="xpl-appSideBarLinksContainer" >
                                { 
                                    menuComponent === 'singleList' && 
                                    <SingleList currentMenu = {currentMenu} 
                                                onClick = {this.onListItemClick}
                                                key = {'Single-List'}
                                                hideMobileMenu = {() => showMobileMenu === true && this.props.onClick()}
                                    /> 
                                }
                                { 
                                    menuComponent === 'detailsList' && 
                                                <DetailsList  
                                                    currentMenu = {currentMenu} 
                                                    currentCategory = {currentCategory} 
                                                    currentCategoryColor = {currentCategoryColor} 
                                                    onClick = {this.onListItemBackClick}
                                                    key = {'Details-List'}
                                                    hideMobileMenu = {() => showMobileMenu === true && this.props.onClick()}
                                    /> 
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
            return ( 
                this.renderSideBar()
            );
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
