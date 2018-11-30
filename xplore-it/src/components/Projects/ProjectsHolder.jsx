/* ==========================================================================
 * Projects Layout Folder Splited By Categories 
 * 22/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { ProjectCard,} from "../../components";
    import { Flipper, Flipped } from "react-flip-toolkit";
    // import {shuffle, concat, upperFirst} from "lodash";
    import routes from '../../routes/routes';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProjectsHolder extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isLoaded : false
            }
        }

        // --------------------------------------
        // Get Category Name
        // --------------------------------------
        getCategoryName() {
            const {pathname} = this.props.pathname;
            const route = pathname.split('/');
            const categoryColor = route.length <= 2 
                ? this.getCategoryColor(pathname) 
                : this.getCategoryColor(`/${route[1]}`);
            return categoryColor.color;

        }

        
        // --------------------------------------
        // Filter Categories by Name
        // --------------------------------------

        getCategoryColor(routePath) {
            const selectedCategory =  routes.filter((route) => route.path === routePath);
            return selectedCategory[0];
        }


        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderProjects () {
            const {productsData} = this.props;
            const projectsColor = this.getCategoryName();

            const data = productsData.map((project) => {return project.partID })

            return (
                <Flipper flipKey={data.join("")} className = "row xpl-row">
                                
                    {productsData.map(product => (
                        <Flipped key={product.partID} flipId={`${product.partID}`}>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <ProjectCard 
                                            key = {product.partID} 
                                            hasSmallDescription={true}  
                                            projectColor = {projectsColor}
                                            {...product}/>
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
        productsData: PropTypes.array
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ProjectsHolder;
