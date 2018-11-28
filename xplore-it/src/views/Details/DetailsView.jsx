/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import { Breadcumbs, WideCard, ProjectCard, TabsLayout,  } from '../../components';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class DetailsView extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    tabIndex : 0,
                    productDetails: [
                        { id : '1', title : 'Tab 1', content: <WideCard/> },
                        { id : '2', title : 'Tab 2', content: <WideCard/> },
                        { id : '3', title : 'Tab 3', content: <WideCard/> },
                        { id : '4', title : 'Tab 4', content: <WideCard/> },
                        { id : '5', title : 'Tab 5', content: <WideCard/> },
                        { id : '6', title : 'Tab 6', content: <WideCard/> },
                        
                    
                    ],
                    projects : [
                        {
                            projectID : 1, 
                            projectTitle : 'Project 1',
                            projectCategory : 'Enviroment',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        },
                        {
                            projectID : 2, 
                            projectTitle : 'Project 2',
                            projectCategory : 'Sales',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        },
                        {
                            projectID : 3, 
                            projectTitle : 'Project 3',
                            projectCategory : 'Quality',
                            projectLink : '/app/details/',
                            projectDescription : 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        },
                      
                     
    
    
                    ]
                }
            }


        /* ==========================================================================
         * State & Logic Functions
        ========================================================================== */

            // --------------------------------------
            // Change Current Tab 
            // --------------------------------------

            changePrevTab = (e) => {
                console.log('e', e.target);
                console.log('detils state', this.state)
                const {tabIndex} =  this.state;
                tabIndex <= 1 
                    ? this.setState({tabIndex : 0 })
                    : this.setState({tabIndex : tabIndex - 1})
            }

            changeNextTab = (e) =>{
                console.log('e', e.target);
                console.log('detils state', this.state)
                const {tabIndex, productDetails} =  this.state;
                tabIndex < productDetails.length - 1
                    ? this.setState({tabIndex : tabIndex + 1})
                    : this.setState({tabIndex : 0 })
            }

            



        /* ==========================================================================
         * Render Methods
        ========================================================================== */

            // --------------------------------------
            // Render BreadCumbs
            // --------------------------------------
                renderBreadcumbs() {
                    return <Breadcumbs/>
                }

            // --------------------------------------
            // Render Details Body
            // --------------------------------------
            renderDetailsBody() {
                const {productDetails, tabIndex}  = this.state;
                return (
                    
                    <div className="xpl-appDescriptionContainer xpl-wideCard xpl-shadow">
                        <TabsLayout 
                            tabsData = {productDetails} 
                            defaultIndex = {tabIndex} 
                            onSelect={tabIndex => this.setState({ tabIndex })}
                            changeNextTab = {this.changeNextTab}
                            changePrevTab = {this.changePrevTab}
                        >
                            <WideCard  tabIndex = {tabIndex}/>
                        </TabsLayout>

                       
                    </div>
                )
            }


            // --------------------------------------
            // Render Related Projects
            // --------------------------------------
            renderRelatedProjects() {
                return (
                    <Fragment>
                        <div className="xpl-relatedContainer">
                        {
                            this.state.projects.map(project => (
                                <ProjectCard key = {project.projectID} hasSmallDescription={true} {...project}/>
                            ))
                        }
                        </div>
                    </Fragment>
                )
            }

            // --------------------------------------
            // Render View
            // --------------------------------------
                renderAppDetailsView() {
                    return (
                        <Fragment>
                            {this.renderBreadcumbs()}
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-9 col-sm-12">
                                        {this.renderDetailsBody()}
                                    </div>

                                    <div className="col-lg-3 col-md-12 col-sm-12">
                                        <div className="xpl-relatedListApps">
                                        <h5>Related Products</h5>
                                            {this.renderRelatedProjects()}
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </Fragment>
                    )
                }   


            // --------------------------------------
            // Render Component
            // --------------------------------------
                render() {
                    return this.renderAppDetailsView();
                }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // DetailsView.propTypes = {
    //     prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default DetailsView;
