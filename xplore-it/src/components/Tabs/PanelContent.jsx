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
    import { AppLoader, FieldsMaker, CardHeaderWide } from '../../components'


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
        renderTabContent(panelTabContent, tabCeroContent, currentTab) {
			console.log('​PanelContent -> renderTabContent -> currentTab', currentTab)
            // const tabCeroContent = <CardHeaderWide productOverview = {productDetails} />  ;
            let content = null;
            currentTab === 0 ? content = <CardHeaderWide productOverview = {tabCeroContent} /> : content = <FieldsMaker formFields={panelTabContent} />

            return content;
            // return (
            //     <FieldsMaker formFields={panelTabContent} />
            // )
        }

        renderTabContentCero() {
            const {tabCeroContent} = this.props;

            return tabCeroContent;
        }

        // --------------------------------------
        // Render Panel
        // --------------------------------------
        render() {
            const { panelTabContent, tabLoading, tabCeroContent, currentTab } = this.props;
			console.log('​PanelContent -> render -> currentTab', currentTab)
            const {innerWidth} = window;
            // const tabsContent = [...]
            return (
                <div style={{ minHeight: innerWidth <= 1024 ? 450 : 550, width: '100%', overflow: 'hidden' }}>
                    {
                        tabLoading === true ? this.renderTabLoader() : this.renderTabContent(panelTabContent, tabCeroContent,currentTab)
                        // tabLoading === true ? this.renderTabLoader() : this.renderTabContentCero()
                    }
                </div>
            )
        }
    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default PanelContent;

