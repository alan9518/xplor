/* ==========================================================================
 * User Profile Page 
 * 26/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import {ProjectCard} from '../../components';

    // --------------------------------------
    // Create Component Class
    // --------------------------------------
    class UserProfile extends Component {

        /* ==========================================================================
         *  Logic and State Handle
         ========================================================================== */
            // --------------------------------------
            // constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    currentCategory : 'All Apps',
                    projects : [
                        {
                            projectID : 1, 
                            projectTitle : 'Project 1',
                            projectCategory : 'Enviroment',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                            projectCarrousel : true,
                        },
                        {
                            projectID : 2, 
                            projectTitle : 'Project 2',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                            projectCarrousel : true,
                        },
                        {
                            projectID : 3, 
                            projectTitle : 'Project 3',
                            projectCategory : 'Quality',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                            projectCarrousel : true,
                        },
                        {
                            projectID : 4, 
                            projectTitle : 'Project 4',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                            projectCarrousel : true,
                        },
                        {
                            projectID : 5, 
                            projectTitle : 'Project 5',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit'
                        },
                        {
                            projectID : 6, 
                            projectTitle : 'Project 6',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit'
                        },
                        {
                            projectID : 7, 
                            projectTitle : 'Project 7',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit'
                        },
                        {
                            projectID : 8, 
                            projectTitle : 'Project 8',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                            projectCarrousel : true,
                        },


                    ]
                }
            }

        


        /* ==========================================================================
         *  Render Methods
         ========================================================================== */

            // --------------------------------------
            // Render Cards use React Flip
            // For Cards Sorting
            // --------------------------------------
            renderuserProjects() {
                const {projects} = this.state;
                return (
                    <Fragment>
                        <div className="row xpl-row">
                            {projects.map(project => (
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <ProjectCard key = {project.projectID} hasSmallDescription={true} {...project}/>
                                </div>
                            ))}
                        </div>
                    </Fragment>
                );
            }


            // --------------------------------------
            // Render user Profile
            // --------------------------------------
            renderUserProfilePage() {
                return (
                    <Fragment>
                        <div className="container-fluid  xpl-profileContainer ">

                            <div className="row xpl-row">
                                <div className="col-lg-12">
                                    <h2>  My Projects </h2>
                                </div>
                            </div>

                           {this.renderuserProjects()}
                        
                        </div>
                    </Fragment>
                )
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
                render() {
                    return this.renderUserProfilePage();
                }   
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // UserProfile.propTypes = {
    // prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default UserProfile;
