/* ==========================================================================
 * SideBar Menu Item Link
 * Functional Component
 * 26/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React  from 'react';
    // import {NavLink} from 'react-router-dom';
    import {ProjectLink} from '../../components';



// --------------------------------------
// Create Component
// --------------------------------------
    const SideBarLink = ({indexKey,title,link,color, hasIcon, onClick, hideMobileMenu, homeIcon, customIcon}) => {
            
            // --------------------------------------
            // Set Styles for Home Style and Icon
            // --------------------------------------
            const homeStyles = {
                borderBottom: '1px solid #eee'
            }
    
            const iconHolderStyleBig = {backgroundColor: color || '#238ECC', width : 30, padding : '7px 5px'}

            const iconHolderStyleSmall = {backgroundColor: color || '#238ECC', width: 30, padding : '6px 5px'}


            if(link !== null) 
            {
                // Link With React Router
                // Create Route for SubItem
                // const subLink = customIcon === true ? `${link}/sub` : link;
                return (
                    <li className = {`xpl-sidebarLink `}  style =  {homeIcon && homeStyles}  onClick = {hideMobileMenu}>
                        <ProjectLink route = {link} itemKey = {indexKey} spRoute = {true} >
                            <div className="xpl-iconContainer">

                                {/* Icon For Sidebar LInk */}
                                {hasIcon && 
                                    <div className="xpl-iconHolder   " style={homeIcon ? iconHolderStyleBig : iconHolderStyleSmall}>
                                        <i className={ homeIcon ? homeIcon : 'fas fa-chevron-right'}></i>
                                    </div>
                                } 

                                {/* Icon For Search Result Item */}
                                {customIcon && 
                                    <div className="xpl-iconHolder   " style={homeIcon ? iconHolderStyleBig : iconHolderStyleSmall}>
                                        <i className={ `fas fa-${customIcon}`}></i>
                                    </div>
                                }

                                <span className="xpl-linkText">{title}</span>
                            </div>
                        </ProjectLink>
                    </li>
                )
            }
                
            else 
            {
                return (
                    // Link Without React Router
                    <li className="xpl-sidebarLink"  onClick = {onClick}>
                        <div className="xpl-iconContainer">
                            {hasIcon && 
                                <div className="xpl-iconHolder" style={homeIcon ? iconHolderStyleBig : iconHolderStyleSmall}>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            }
                            <span className="xpl-linkText">{title}</span>
                        </div>
                </li>
                )
            }
            
            

    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default SideBarLink;