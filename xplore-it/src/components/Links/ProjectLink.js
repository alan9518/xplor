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
        const {route, itemKey} = props;


        return (
            <NavLink to= {route} key = {itemKey} >
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

