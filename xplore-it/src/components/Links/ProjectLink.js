/* ==========================================================================
 * Project Link Component 
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, {Component} from 'react';
    import PropTypes from 'prop-types';
    import {NavLink} from 'react-router-dom';
    import {Config} from '../../Config';

// --------------------------------------
// Create link Component
// --------------------------------------
    const ProjectLink = (props) => {

        const {path,projectPath} =  Config

        return (
            <NavLink to = { `/${projectPath}/2` }>
                {props.children}
            </NavLink>
        )
    }


// --------------------------------------
// Declare Project Props
// --------------------------------------
    ProjectLink.propTypes = {
        route: PropTypes.object,
        projectId : PropTypes.number,
        encryptedID : PropTypes.string 
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectLink;

