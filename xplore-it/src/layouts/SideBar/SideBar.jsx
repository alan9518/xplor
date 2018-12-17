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
    import axios from 'axios';
    import {Endpoints} from '../../services/endpoints';
    import {sortBy, shuffle} from 'lodash';
    import {Config} from '../../Config';


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

            this.path = Config.spPath
        }

        // --------------------------------------
        // Call API
        // --------------------------------------
        componentDidMount() {
            this.getSideBarRoutes();
        }

        /* ==========================================================================
         * API Connection 
         ========================================================================== */

        async getSideBarRoutes() {
            // Create Navigation Object 
            // Add the Home Route as Static
            let navigationRoutes = [
                {
                    path : `${this.path}/catalogue/all/all`,
                    exact: false,
                    sidebarName : 'Home',
                    key:'home-route',
                    color : '#1197D3',
                    homeIcon : 'fas fa-home'
                },
                
            ];

            // Get Colors
            const colorsArray = await this.getColors();

            // Get Topic
            const getSoftwareTopicsPromise = await axios.get(Endpoints.getAllCategories);
            const softwareTopicsData =  await getSoftwareTopicsPromise.data;
            const orderedSoftwareTopicsData = sortBy(softwareTopicsData,[(route)=>{return route.CustomerName}])
            // Create Routes  
            orderedSoftwareTopicsData.map((topic) => {

                let route = {
                    path :  `${this.path}/catalogue/${topic.CustomerName}/${topic.CustomerID}`,
                    exact: false,
                    sidebarName : topic.CustomerName,
                    key : topic.CustomerID,
                    // color : shuffle(colorsArray)[0],
                    color : this.mergeRoutes(colorsArray,topic),
                    subCategories : topic.SubCap
                }

                // this.mergeRoutes(colorsArray, topic)
                navigationRoutes.push(route);

            }) 

            // const mergedRoutes = {}

            
            // Set Menu To Show and Allow Render
            this.setState( {
                currentMenu : navigationRoutes,
                isLoaded : true
            })
            
        }

            
            /** --------------------------------------
            // Get Colors
            // @returns {A Promise Object}
            // --------------------------------------*/
            async getColors() {
                const getColorsPromise = await axios.get(Endpoints.getSideBarColorsSP)
                const getColorsResponse =  await getColorsPromise.data.value;
                const colorsArray = (getColorsResponse.map((color)=> {
                    return {
                        color : color.Color,
                        name : color.Title,
                        order: color.Order1
                    }
                }));
                console.log('colorsArray', colorsArray);

                return (colorsArray);
            }


            // --------------------------------------
            // Merge SP Colors & API Colors
            // To get The Color for The Route
            // --------------------------------------
            mergeRoutes(spColors, currentRoute) {
                const mergedColor = spColors.filter((spColor) => {
                    if(spColor.name === currentRoute.CustomerName)
                        return spColor.color
                })

                
                console.log('mergedColor', mergedColor);

                return mergedColor[0].color;
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

                // Create New Menu Based on the SubCap
                const subMenu = subCategories.map((subCap) => {
                    return {
                        id : subCap.CustomerID,
                        path :  `${this.path}/catalogue/${subCap.SubCapabilities}/${subCap.CustomerID}`,
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
