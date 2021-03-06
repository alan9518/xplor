/* ==========================================================================
** Edit Project Component
** 03/06/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// --------------------------------------
// Create Component Class
// --------------------------------------
class EditProject extends Component {
    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */
        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
            }
        }


        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        componentDidMount() {
        }


    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */


        // --------------------------------------
        // Render EditProject
        // --------------------------------------
        renderEditProject() {
            return (
                <Fragment> Edit View  </Fragment>
            )
        }
        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderEditProject();
        }
}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    EditProject.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
export default EditProject;