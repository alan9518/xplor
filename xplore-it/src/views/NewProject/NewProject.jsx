/* ==========================================================================
 * Form View of add a New Project 
 * 12/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component }  from 'react';
    import PropTypes from 'prop-types';
    import { NewProjectForm } from '../../components'


// --------------------------------------
// Create Component Class
// --------------------------------------
    class NewProject extends Component {


        // --------------------------------------
        // Render Form
        // --------------------------------------   
            renderForm() {
                return <NewProjectForm/>
            }


        // --------------------------------------
        // Render Component
        // --------------------------------------
            render() {
                return (
                    this.renderForm()
                )
            }
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    // NewProject.propTypes = {
    // prop: PropTypes
    // }


// --------------------------------------
// Export Component
// --------------------------------------
    export default NewProject; 