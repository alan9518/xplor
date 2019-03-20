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
    import {withRouter, Redirect} from 'react-router-dom';

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
                currentMenu : [],
                previousMenu : [],
                menuComponent : 'singleList',
                currentCategory : null,
                currentCategoryColor : null,
                redirectUser : false,
                redirectPath : ''
                // isLoaded : false
            }
        }

        // --------------------------------------
        // Call API
        // --------------------------------------
        componentDidMount() {
            // this.getSideBarRoutes();
            const {categories} = this.props;
            this.setState({
                currentMenu : categories,
                // isLoaded : true
            })
        }


        
        /* ==========================================================================
         * Handle State
         ========================================================================== */

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
            // Get The Previopus Menu from State
            // --------------------------------------
            onListItemBackClick = (e) => {
                const {previousMenu} = this.state;
                this.setState({
                    currentMenu : previousMenu,
                    menuComponent : 'singleList',
                    redirectUser : false,
                    redirectPath : ''
                })
            }


            // --------------------------------------
            // Open SubMenu
            // --------------------------------------
            onListItemClick = (menu) =>  {
				console.log('TCL: SideBar -> onListItemClick -> menu', menu)
                const {currentMenu} =  this.state;
                const {SubCap, sidebarName, color } = menu;

                // Create New Menu Based on the SubCap
                const subMenu = SubCap.map((subCapValue) => {
                    return {
                        id : subCapValue.CustomerID,
                        // path :  `${this.path}/catalogue/${subCapValue.SubCapabilities}/${subCapValue.CustomerID}`,
                        // path :  `$catalogue/${subCapValue.SubCapabilities}/${subCapValue.CustomerID}`,
                        path :  `catalogue/${subCapValue.SubCapabilities}/${subCapValue.CustomerID}/sub`,
                        exact: true,
                        sidebarName : subCapValue.SubCapabilities,
                        key : `${subCapValue.Capabilities}-${subCapValue.SubCapabilities}`,
                    }
                })


                // Set New Menu on the State and Save the Previous One
                this.setState((prevState) => {
                    return {
                        currentCategory: sidebarName,
                        menuComponent : 'detailsList',
                        currentCategoryColor : color,
                        currentMenu: subMenu,
                        previousMenu : currentMenu  ,
                        redirectUser : true,
                        redirectPath : `sites/xplorit_portal/xplorit/XplorIT.aspx/catalogue/${menu.CustomerName}/${menu.CustomerID}`,
                        // redirectPath : `sites/xplorit_portal/xplorit/XplorIT.aspx/catalogue/Productivity(ITTools)/1014`
                    };
                });
                
            }


            // --------------------------------------
            // Filter Routes By Category
            // --------------------------------------
            filterRoutesByParentCategory = (menuFromDetailsList) => {
				// 
                this.props.onFilterRoutesClick(menuFromDetailsList);
            }

        
        /* ==========================================================================
         * Render Methods
         ========================================================================== */


        
            // --------------------------------------
            // Render Sidebar 
            // --------------------------------------
            renderSideBar() {
                const {currentMenu, menuComponent, currentCategory, currentCategoryColor, redirectUser, redirectPath} = this.state;
                const {showMobileMenu ,onClick, responsiveWidth} = this.props;
                const sidebarClass = showMobileMenu === true?  'showMobileMenu' : '';
                const responsiveSideBarStyle = {
                    maxWidth : `${responsiveWidth}px`
                }
                
                return (
                    <Fragment>

                        
                        <div className = {`xpl-appSideBar ${sidebarClass}`}   style = {responsiveSideBarStyle} >
                        
                            
                            <div className="xpl-appSideBarBody"  >
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
                                                    hideMobileMenu = {(e) => showMobileMenu === true && this.props.onClick(e)}
                                        /> 
                                    }
                                    { 
                                        menuComponent === 'detailsList' && 
                                                    <DetailsList  
                                                        currentMenu = {currentMenu} 
                                                        currentCategory = {currentCategory} 
                                                        currentCategoryColor = {currentCategoryColor} 
                                                        onClick = {this.onListItemBackClick}
                                                        // onClick = {this.onListItemClick}
                                                        key = {'Details-List'}
                                                        onFilterRoutesClick = {this.filterRoutesByParentCategory}
                                                        hideMobileMenu = {(e) => showMobileMenu === true && this.props.onClick(e)}
                                        /> 
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        { redirectUser  && <Redirect to={`/${redirectPath}`}  />}
                        
                </Fragment>
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return ( 
                    this.renderSideBar()
                    // isLoaded ? this.renderSideBar() : null
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
    export default withRouter(SideBar);
