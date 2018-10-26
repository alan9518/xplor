/* ==========================================================================
 * SideBar Menu Item Link
 * Functional Component
 * 26/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, {Component, Fragment} from 'react';
    import {NavLink} from 'react-router-dom';


// --------------------------------------
// 
// --------------------------------------


// --------------------------------------
// Create Component
// --------------------------------------
    const SideBarLink = ({key,indexKey,title,Link,color}) => {
    
        const iconHolderStyle = {
            backgroundColor: color
        }

        return (<li className="xpl-sidebarLink"  >
                    <NavLink to={Link} key={indexKey}>
                        <div className="xpl-iconContainer">
                            <div className="xpl-iconHolder" style={iconHolderStyle}>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <span className="xpl-linkText">{title}</span>
                        </div>
                    </NavLink>
            </li>
        )

    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default SideBarLink;