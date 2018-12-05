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
    import routesAPI from '../../routes/routesAPI'
    import axios from 'axios';
    import {Endpoints} from '../../services/endpoints';
    import {find, shuffle} from 'lodash';

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
                isLoaded : false
            }
        }

        componentDidMount() {
            this.getSideBarRoutes();
        }

        /* ==========================================================================
         * API Connection 
         ========================================================================== */
        async getSideBarRoutes() {
            const path = '';
            const colorsArray =  [
                '#1197D3',
                '#07562F',
                '#5F4082',
                '#84B130' ,
                '#F6C760',
                '#D60B33',
                '#238ECC',
                '#B60BAC',
                '#8F1859',
                '#E18A50',
            ]
            let navigationRoutes = [
                {
                    path : `${path}/catalogue/all/all`,
                    exact: false,
                    sidebarName : 'Home',
                    key:'home-route',
                    color : '#1197D3',
                    homeIcon : 'fas fa-home'
                },
                
            ];

            // Get Topic
            const getSoftwareTopicsPromise = await axios.get(Endpoints.getAllCategories);
            const softwareTopicsData =  await getSoftwareTopicsPromise.data;

            // Create Routes  
            softwareTopicsData.map((topic) => {

                let route = {
                    path :  `${path}/catalogue/${topic.CustomerName}/${topic.CustomerID}`,
                    exact: false,
                    sidebarName : topic.CustomerName,
                    key : topic.CustomerID,
                    color : shuffle(colorsArray)[0],
                    subCategories : topic.SubCap
                }

                navigationRoutes.push(route);
            }) 


            // Set Menu To Show and Allow Render
            this.setState( {
                currentMenu : navigationRoutes,
                isLoaded : true
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
                    menuComponent : 'singleList'
                })
            }


            // --------------------------------------
            // Open SubMenu
            // --------------------------------------
            onListItemClick = (menu) =>  {
                const {currentMenu} =  this.state;
                const {subCategories, sidebarName, color } = menu;
                console.log('menu', menu);
                const path = '';

                // Create New Menu Based on the SubCap
                const subMenu = subCategories.map((subCap) => {
                    return {
                        id : subCap.CustomerID,
                        path :  `${path}/catalogue/${subCap.SubCapabilities}/${subCap.CustomerID}`,
                        exact: true,
                        sidebarName : subCap.SubCapabilities,
                        key : `${subCap.Capabilities}-${subCap.SubCapabilities}`,
                    }
                })


                // Set New Menu on the State and Save the Previous One
                this.setState((prevState) => {
                    return {
                        currentCategory: sidebarName,
                        menuComponent : 'detailsList',
                        currentCategoryColor : color,
                        currentMenu: subMenu,
                        previousMenu : currentMenu  
                    };
                });
                
            }

        
        /* ==========================================================================
         * Render Methods
         ========================================================================== */


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
                const {isLoaded} = this.state;
                return ( 
                    isLoaded ? this.renderSideBar() : null
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
