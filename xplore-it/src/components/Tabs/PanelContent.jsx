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
  
    import React , {Component, Fragment} from 'react';
    import ReactDOM from 'react-dom';
    import {AppLoader,  FieldsMaker} from '../../components'
  

    class PanelContent extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                panelTabContent : props.panelTabContent,
                tabLoading : props.tabLoading
            }
        }
    
      

        // --------------------------------------
        // Loader Inside the Tab Panel
        // --------------------------------------

        renderTabLoader() {
            return <AppLoader customHeight = {550}/>
        }
      
        

        // --------------------------------------
        // Render Panel Content
        // --------------------------------------
        renderTabContent(panelTabContent) {
            return (
                <FieldsMaker formFields = {panelTabContent}/>
            )
        }

        // --------------------------------------
        // Render Panel
        // --------------------------------------
        render() {
            const {panelTabContent, tabLoading} = this.props;
            return (
                <div style={{ minHeight: 550, width: '100%', overflow: 'hidden' }}>
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

