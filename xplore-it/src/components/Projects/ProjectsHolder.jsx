/* ==========================================================================
 * Projects Layout Folder Splited By Categories 
 * 22/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import { ProjectCard,} from "../../components";
    import { Flipper, Flipped } from "react-flip-toolkit";
    import {shuffle, concat, upperFirst} from "lodash";
    import routes from '../../routes/routes';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProjectsHolder extends Component {

        constructor(props) {
            super(props);
            this.cardColor = ''
            this.state = {
                isLoaded : false
            }
        }

        getColor() {
            const {pathname} = this.props.pathname;
            const route = pathname.split('/');
            const categoryColor = route.length <= 2 
                ? this.getCategoryColor(pathname) 
                : this.getCategoryColor(`/${route[1]}`);
            return categoryColor.color;

        }

    

        getCategoryColor(routePath) {
            const selectedCategory =  routes.filter((route) => route.path === routePath);
            return selectedCategory[0];
        }


        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderProjects () {
            const {projectsData} = this.props;
            const projectsColor = this.getColor();

            const data = projectsData.map((project) => {return project.projectID })

            return (
                <Flipper flipKey={data.join("")} className = "row xpl-row">
                                
                    {projectsData.map(project => (
                        <Flipped key={project.projectID} flipId={`${project.projectID}`}>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <ProjectCard 
                                            key = {project.projectID} 
                                            hasSmallDescription={true}  
                                            projectColor = {projectsColor}
                                            {...project}/>
                                </div>
                        </Flipped>
                    ))}
                </Flipper>
            )
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderProjects() ;
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    ProjectsHolder.propTypes = {
        projectsData: PropTypes.array
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectsHolder;
