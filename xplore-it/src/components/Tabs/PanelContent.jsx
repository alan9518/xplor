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


    class PanelContent extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                panelTabContent: props.panelTabContent,
                tabLoading: props.tabLoading
            }
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
            const {isOverview, tabTitle} = this.props
            return (
                <FieldsMaker formFields={panelTabContent} tabTitle = {tabTitle}/>
            )
        }

        // --------------------------------------
        // Render Panel
        // --------------------------------------
        render() {
            const { panelTabContent, tabLoading } = this.props;
			console.log("TCL: PanelContent -> render -> this.props", this.props)
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

