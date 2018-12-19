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
    import { ProjectCard, NoData} from "../../components";
    import { Flipper, Flipped } from "react-flip-toolkit";
    // import {shuffle, concat, upperFirst} from "lodash";
    import routes from '../../routes/routes';
    import {Endpoints} from '../../services/endpoints';
    import {sortBy, shuffle} from 'lodash';
    import {Config} from '../../Config';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProjectsHolder extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isLoaded : false,
            }
        }

        componentDidMount() {
            this.props.shuffle();
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
        // Render No Data Message
        // --------------------------------------
        renderError() {
            const message = 'No Data Found';
            return <NoData message = {message}></NoData>
        }


        // --------------------------------------
        // Render Flipper
        // --------------------------------------
        /** --------------------------------------
        // Render Project Cards
        // Use Flipper
        // @param {products Data an array with all the products and the Colors}
        // @param {data  an array with all the ID's of the cards to handle the Shuffle and sorting of cards }
        // --------------------------------------*/
        renderFlipperContainer(productsData, data) {
            return (
                <Flipper flipKey={data.join("")} className = "row xpl-row">
                                
                    {productsData.map(product => (
                        <Flipped key={product.partID} flipId={`${product.partID}`}>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <ProjectCard 
                                            key = {product.partID} 
                                            hasSmallDescription={true}  
                                            projectColor = {product.color}
                                            {...product}/>
                                </div>
                        </Flipped>
                    ))}
                </Flipper>
            )
        }


        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderProjects () {
            const {productsData, categoryColor} = this.props;
            
            const projectsColor =  categoryColor || '#1197D3';

            const data = productsData.map((project) => {return project.partID })

            return (
                productsData.length <= 0 
                ? this.renderError()
                : this.renderFlipperContainer(productsData, data,projectsColor)
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
