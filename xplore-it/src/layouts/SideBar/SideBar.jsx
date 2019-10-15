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
    import {Config} from '../../Config';

    const {spPath, fullPath, Bussmodel} = Config // ? Host Path

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
                redirectPath : '',
                singleMenuClick : false,
            }
        }

        // --------------------------------------
        // Call API
        // --------------------------------------
        componentDidMount() {
            const {categories} = this.props;
            this.setState({
                currentMenu : categories,
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
                    redirectPath : '',
                    singleMenuClick : false
                })
            }


            // --------------------------------------
            // Open SubMenu
            // redirectPath : `sites/xplorit_portal/XplorIT/XplorIT.aspx/catalogue/${menu.CustomerName}/${menu.CustomerID}`,
            // --------------------------------------
            onListItemClick = (menu) =>  {
                const {currentMenu} =  this.state;
                const {SubCap, sidebarName, color, CustomerName } = menu;

                //? Create New Menu Based on the SubCap
                const subMenu = SubCap.map((subCapValue,index) => {
                    return {
                        id : subCapValue.CustomerID,
                        path :  `catalogue/${CustomerName}/${subCapValue.SubCapabilities}/sub`,
                        exact: true,
                        sidebarName : subCapValue.SubCapabilities,
                        key : `${subCapValue.CustomerName}-${subCapValue.SubCapabilities}`,
                    }
                })



                //? Set New Menu on the State and Save the Previous One
                const { resetMenu } = this.props;
                let resetSidebarMenu = resetMenu
                if(this.props.location.pathname === `${spPath}/catalogue/all/all` && resetMenu === false)
                    resetSidebarMenu = true
                else
                    resetSidebarMenu = false

                this.setState((prevState) => {
                    return {
                        currentCategory: sidebarName,
                        menuComponent : 'detailsList',
                        currentCategoryColor : color,
                        currentMenu: subMenu,
                        previousMenu : resetSidebarMenu === true ? this.props.categories : currentMenu   ,
                        redirectUser : true,
                        redirectPath : `sites/xplorit_portal/XplorIT/XplorIT.aspx/catalogue/${menu.CustomerName}/all`,
                        // redirectPath : `sites/innovationlabs/xplorIT/XplorIT.aspx/catalogue/${menu.CustomerName}/all`,
                        singleMenuClick : true
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

                const {resetMenu} = this.props;
                let resetMenuToShow = resetMenu


                if(this.props.location.pathname === `${spPath}/catalogue/all/all` || this.props.location.pathname === "/catalogue/all/all")
                    resetMenuToShow = true
                else
                    resetMenuToShow = false


                let menuToShow = resetMenuToShow === true ? 'singleList' : menuComponent
                

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

                                    
                                        // ? Check if the user clicked the Home Link
                                        //? Render Normal Menu
                                        menuToShow === 'singleList' && 
                                        <SingleList currentMenu = {resetMenuToShow === true ? this.props.categories : currentMenu   } 
                                                    onClick = {this.onListItemClick}
                                                    key = {'Single-List'}
                                                    hideMobileMenu = {(e) => showMobileMenu === true && this.props.onClick(e)}
                                        /> 
                                    }
                                    { 
                                        // ? Sub Menu
                                        menuToShow === 'detailsList' && 
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
