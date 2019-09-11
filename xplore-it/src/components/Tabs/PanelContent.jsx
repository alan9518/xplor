/* ==========================================================================
 * Tabs Content Panel Layout
 * 03/01/2019
 * using rc-tabs
 * http://react-component.github.io/tabs/
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, } from 'react';
    import { AppLoader, FieldsMaker, } from '../../components'


// --------------------------------------
// Create Component Class
// --------------------------------------

    class PanelContent extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                panelTabContent: props.panelTabContent,
                tabLoading: props.tabLoading
                // panelTabContent: [],
                // tabLoading: false
            }
        }


        componentDidMount() {
            this.setState({
                panelTabContent: this.props.panelTabContent,
                tabLoading: this.props.tabLoading
            })
        }


        componentWillReceiveProps(nextProps) {
            console.log("TCL: PanelContent -> componentWillReceiveProps -> nextProps", nextProps)

            
            console.log("TCL: PanelContent -> componentWillReceiveProps -> this.props", this.props)


            //? Set State for Product Overvew on Edit Mode

            if(nextProps.panelTabContent.updatePanelContent){

                const {panelTabContent} = nextProps;


                this.setState({
                    panelTabContent : panelTabContent,
                    tabLoading : nextProps.tabLoading
                })


                
            }

            // ? Set state for Other Tabs on Read Mode
            else if(nextProps.tabTitle !== 'Product Overview') {
                
                this.setState({
                    panelTabContent : nextProps.panelTabContent,
                    tabLoading : nextProps.tabLoading
                })
            }

            // ? Set State product overview on Read Mode

        else {
                
                this.setState({
                    panelTabContent : nextProps.panelTabContent,
                    tabLoading : nextProps.tabLoading
                })
        }
            


        }



        // ?--------------------------------------
        // ? Update Values to Show
        // ? @param {dataRequest} webService Request from AddProjectForm
        // ? @param {dataState} Add Project Form State
        // ?--------------------------------------

        updatePanelTabContent =(dataRequest, dataState)=> {
            console.log("TCL: PanelContent -> updatePanelTabContent -> dataState", dataState)
            console.log("TCL: PanelContent -> updatePanelTabContent -> dataRequest", dataRequest)
                
            
            
            this.props.updateOverViewStatus(dataRequest, dataState)
            



        }



        // --------------------------------------
        // Loader Inside the Tab Panel
        // --------------------------------------

        renderTabLoader() {
            return <AppLoader customHeight={550} />
        }



        // --------------------------------------
        // Render Panel Content
        // --------------------------------------
        renderTabContent(panelTabContent) {
            console.log("TCL: PanelContent -> renderTabContent -> panelTabContent", panelTabContent)
            const {isOverview, tabTitle, editFields, newProject, enableTabEdit,} = this.props
            return (
                <FieldsMaker 
                    formFields = {panelTabContent} 
                    tabTitle = {tabTitle} 
                    editFields = {editFields} 
                    isOverview = {isOverview} 
                    newProject = {newProject}
                    enableTabEdit = {enableTabEdit}
                    updateFormValues = {this.props.updateFormValues}
                    updateOverViewStatus = {this.updatePanelTabContent}
                />
            )
        }

        // --------------------------------------
        // Render Panel
        // --------------------------------------
        render() {
            const { panelTabContent, tabLoading } = this.state;
            console.log("TCL: PanelContent -> render -> this.state", this.state)
            // console.log("TCL: PanelContent -> render -> this.props", this.props)
            const { innerWidth } = window;
            return (
                <div style={{ minHeight: innerWidth <= 1024 ? 450 : 550, width: '100%', overflow: 'hidden' }}>
                    {
                        tabLoading === true ? this.renderTabLoader() : this.renderTabContent(panelTabContent)
                    }
                </div>
            )
        }
    }

// --------------------------------------
// Export Component
// --------------------------------------
export default PanelContent;

