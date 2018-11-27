/* ==========================================================================
 * Main Dashboard Template View
 * Add Here all the Components that will show on the main Panel
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import {
        HeaderButton,
        ToggleButton,
        ProjectCard,
        Carrousel,
        ProjectsHolder
    } from "../../components";
    
    import {shuffle, startCase, replace} from "lodash";
    import InfiniteScroll from 'react-infinite-scroller';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {


        // --------------------------------------
        // constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                currentCategory : 'All Apps',
                isLoaded : true,
                categoryColor : '',
                projects : [
                    {
                        projectID : 1, 
                        projectTitle : 'Project 1',
                        projectCategory : 'Enviroment',
                        projectIcon : 'fab fa-accusoft',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        projectCarrousel : true,
                    },
                    {
                        projectID : 2, 
                        projectTitle : 'Project 2',
                        projectCategory : 'Sales',
                        projectIcon : 'fab fa-audible ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        projectCarrousel : true,
                    },
                    {
                        projectID : 3, 
                        projectTitle : 'Project 3',
                        projectCategory : 'Quality',
                        projectIcon : 'fas fa-broom ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        projectCarrousel : true,
                    },
                    {
                        projectID : 4, 
                        projectTitle : 'Project 4',
                        projectCategory : 'Sales',
                        projectIcon : 'fas fa-bomb ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        projectCarrousel : true,
                    },
                    {
                        projectID : 5, 
                        projectTitle : 'Project 5',
                        projectCategory : 'Sales',
                        projectIcon : 'fas fa-chalkboard ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    },
                    {
                        projectID : 6, 
                        projectTitle : 'Project 6',
                        projectCategory : 'Sales',
                        projectIcon : 'fas fa-cloud-moon ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    },
                    {
                        projectID : 7, 
                        projectTitle : 'Project 7',
                        projectCategory : 'Sales',
                        projectIcon : 'fas fa-circle-notch ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    },
                    {
                        projectID : 8, 
                        projectTitle : 'Project 8',
                        projectCategory : 'Sales',
                        projectIcon : 'fab fa-codepen ',
                        projectLink : '/app/details/',
                        projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        projectCarrousel : true,
                    },

                ]
            }
        }

        // --------------------------------------
        // Get the Current Category from the URL
        // Before the Component Renders
        // --------------------------------------
        componentWillMount() {
            this.splitRouteName();
        }

        // --------------------------------------
        // Initial Shuffle
        // --------------------------------------
        componentDidMount() {
            this.setState({
                isLoaded : true
            })
            this.shuffle();
        }


        /* ==========================================================================
         *  Render Logic and State Handle
         ========================================================================== */



        // --------------------------------------
        // Get Route Params and change 
        // Current Category from the view
        // --------------------------------------
        splitRouteName() {
            const {pathname} = this.props.location;
            const route = pathname.split('/');

            this.setState({
                currentCategory : `${this.formatTitle(route)} Products`,
                
            })
        }


        // --------------------------------------
        // Set Fist Uppercase and remove -
        // --------------------------------------
        formatTitle(routeName) {
            const title = startCase( replace(routeName [routeName.length - 1]), '-' , '');
            return title === 'Catalogue' ?  "All" :  title
        }
        
        
        // --------------------------------------
        // Shuffle Cards
        // --------------------------------------
        shuffle = () => {
            this.setState(({ projects }) => ({
                projects: shuffle(projects)
            }));
        }


        /* ==========================================================================
         *  Render Methods
         ========================================================================== */


            // --------------------------------------
            // Render Dashboard
            // --------------------------------------
            renderDashboard() {
                
                return (
                    <Fragment>
                        {this.renderCarrousel()}
                        {this.renderFlipperBody()}
                    </Fragment>
                )

            }


            // --------------------------------------
            // Render Slick Carrousel
            // --------------------------------------

            renderCarrousel() {
                const {projects} = this.state;
                const carrouselProjects = projects.filter((project)=> project.projectCarrousel ) ;


                return (
                    <div className="row xpl-carrouselRow">
                        <div className="col-lg-12">
                            <h3 className="xpl-row xpl-allAppTitle"> What's New? </h3>
                            <Carrousel carrouselData = {carrouselProjects} />
                        </div>
                    </div>
                )
            }


            // --------------------------------------
            // Render Cards use React Flip
            // For Cards Sorting
            // --------------------------------------
            renderFlipperBody() {
                
                const {currentCategory, projects} = this.state;
                const {pathname} = this.props.location;
                // console.log('categoryColor', this.state);/
                
                return (
                    <Fragment>
                        
                        <div className="row xpl-row">
                            {/* <button onClick={this.shuffle}> shuffle</button> */}

                            <div className="col-lg-12">
                                <h3 className="xpl-allAppTitle">{currentCategory}</h3>
                            </div>

                        </div>

                        <ProjectsHolder projectsData = {projects} pathname = {this.props.location}/>

                    </Fragment>
                );
            }


    

            // --------------------------------------
            // Render Body With Dummy Layout
            // --------------------------------------
            renderDummyBody() {
                return (
                <Fragment>
                    <div className="row xpl-carrouselRow">
                        <div className="col-lg-12">
                            <h3 className="xpl-row xpl-allAppTitle"> What's New? </h3>
                            <Carrousel />
                        </div>
                    </div>

                    <div className="row xpl-row">
                        <div className="col-lg-12">
                            <h3 className="xpl-allAppTitle"> All Apps </h3>
                        </div>

                    
                        
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {1} hasSmallDescription={true} />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {2} hasSmallDescription={true} />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {4} hasSmallDescription={true} />
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <ProjectCard key = {4} hasSmallDescription={true} />
                            </div>
                        
                    </div>
                </Fragment>
                );
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.state.isLoaded && this.renderDashboard();
            }
    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;
