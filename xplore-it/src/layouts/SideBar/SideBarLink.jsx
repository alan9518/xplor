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
    import {NavLink} from 'react-router-dom';


// --------------------------------------
// 
// --------------------------------------


// --------------------------------------
// Create Component
// --------------------------------------
    const SideBarLink = ({key,indexKey,title,link,color, hasIcon, onClick}) => {
    
        const iconHolderStyle = {
            backgroundColor: color
        }

            if(link !== null) 
            {
                return (
                    <li className="xpl-sidebarLink"  >
                    <NavLink to={link} key={indexKey}>
                        <div className="xpl-iconContainer">
                            {hasIcon && 
                                <div className="xpl-iconHolder" style={iconHolderStyle}>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            }
                            <span className="xpl-linkText">{title}</span>
                        </div>
                    </NavLink>
                </li>
                )
            }
                
            else 
            {
                return (
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