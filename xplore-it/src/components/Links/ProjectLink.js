/* ==========================================================================
 * Project Link Component 
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import {NavLink} from 'react-router-dom';
    import {Config} from '../../Config'

// --------------------------------------
// Create link Component
// --------------------------------------
    const ProjectLink = (props) => {

        const {route, itemKey, spRoute} = props;
        const {spPath, projectPath} =  Config;

        // Check if the route comes from the NavBar or ProjectCard or Sidebar
        // First Option : Route Comes from NavBar, ProfilePage
        
        const routePath = spRoute === true ? `${spPath}/${route}` : `${projectPath}/${route}`


        return (
            <NavLink to= {routePath} key = {itemKey} >
                {props.children}
            </NavLink>
        )
    }


// --------------------------------------
// Declare Project Props
// --------------------------------------
    ProjectLink.propTypes = {
        route: PropTypes.string,
        itemKey : PropTypes.string,
        projectPath : PropTypes.string,
        projectId : PropTypes.number,
        encryptedID : PropTypes.string 
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectLink;

