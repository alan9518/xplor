/* ==========================================================================
 * Single Menu List Component
 * Render Sub Categories Sidebar Menu
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
    class DetailsList extends Component {
        
        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            // const currentCategory =  this.props.currentMenu.filter((item)=>{return item.sidebarName});


            // this.currentCategory =  this.props.currentMenu[0].sidebarName;
            // this.currentCategoryColor =  this.props.currentMenu[0].color;
        }


        // --------------------------------------
        // Hide SidebarMenu from then Parent
        // --------------------------------------
        hideMobileMenu = (e) => {
            const {hideMobileMenu} = this.props;
            hideMobileMenu();
        }

        // --------------------------------------
        // Render Menu Structure
        // --------------------------------------
        renderMenuList() {
            const {currentMenu, onClick, currentCategory, currentCategoryColor} = this.props;
            const borderStyle = {
                borderLeft: `26px solid ${currentCategoryColor}`,
                height:'544px'
            }


            return (
                <div>
                    <div className="xpl-appSidebarDetailsContainer" style={borderStyle}>
                        <div className="xpl-appSidebarTitleContainer">
                        <button className="xpl-button xpl-backButton" onClick = {onClick}>
                            <i className="fas fa-chevron-left"></i>  
                        </button>
                            <h4 className="xpl-appCategory">{currentCategory}</h4>
                            <span> Recommended for your business department </span>
                        </div>

                        <div className="xpl-appSideBarSubCat">
                        
                            <ul className = "xpl-linksList ">
                                {this.renderList(currentMenu)}
                            </ul> 
                        
                        </div>

                    </div>
                </div>
            )
        }

        // --------------------------------------
        // Iterate Routes and Render
        // --------------------------------------
        renderList(currentMenu) {
        
            return (
                currentMenu.map((menuItem)=> {
                    return ( 
                        <SideBarLink 
                            key = { menuItem.key } 
                            indexKey = { menuItem.key } 
                            title = { menuItem.sidebarName } 
                            link = { menuItem.path } 
                            color = { menuItem.color } 
                            hasIcon =  {false}
                            hideMobileMenu = {this.hideMobileMenu}
                        />
                    )
                })
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderMenuList()
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    DetailsList.propTypes = {
        currentCategory : PropTypes.string,
        currentMenu: PropTypes.array,
        onClick: PropTypes.func,
        currentCategoryColor : PropTypes.string,
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default DetailsList;