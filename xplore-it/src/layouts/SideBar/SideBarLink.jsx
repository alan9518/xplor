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
    const SideBarLink = ({indexKey,title,link,color, hasIcon, onClick, hideMobileMenu}) => {
    
            const iconHolderStyle = {backgroundColor: color}


            if(link !== null) 
            {
                // Link With React Router
                return (
                    <li className="xpl-sidebarLink"   onClick = {hideMobileMenu}>
                        <ProjectLink route = {link} itemKey = {indexKey}>
                            <div className="xpl-iconContainer">
                                {hasIcon && 
                                    <div className="xpl-iconHolder" style={iconHolderStyle}>
                                        <i className="fas fa-chevron-right"></i>
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
                                <div className="xpl-iconHolder" style={iconHolderStyle}>
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