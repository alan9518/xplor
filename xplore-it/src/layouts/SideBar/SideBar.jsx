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
    import { SingleList, DetailsList, Search } from "../../components";

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
                currentCategory : ''
            }
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

        onListItemClick = (e) => {
            // const value = e;
            // console.log('value', value);
            this.setState({
                currentMenu: this.routes,
                menuComponent : 'detailsList'
            })
        }


        // --------------------------------------
        // Render Sidebar 
        // --------------------------------------
        renderSideBar() {
            const {currentMenu, menuComponent, currentCategory} = this.state;
            return (
                <React.Fragment>
                    <div className="xpl-appSideBarBody">
                        
                        <Search/>
                        
                        <div className="xpl-appSideBarLinksContainer">

                            { 
                                menuComponent === 'singleList' && 
                                <SingleList currentMenu = {currentMenu} 
                                            currentCategory = {currentCategory}
                                            onClick = {this.onListItemClick}
                                /> 
                            }
                            { 
                                menuComponent === 'detailsList' && 
                                            <DetailsList  
                                                currentMenu = {currentMenu} 
                                                currentCategory = {currentCategory} 
                                                currentCategoryColor = {'000'} 
                                                onClick = {this.onListItemBackClick}
                                /> 
                            }
                            
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
