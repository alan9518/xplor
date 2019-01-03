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
  

    class PanelContent extends React.Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            console.log(this.props.id, 'constructor');
        }
    
        componentWillReceiveProps() {
            console.log(this.props.id, 'componentWillReceiveProps');
        }
    

        // --------------------------------------
        // Render Panel
        // --------------------------------------
        render() {
            const {panelTabContent} = this.props;
            return (
                <div style={{ height: 200, overflow: 'auto' }}>
                    {panelTabContent}
                </div>
            )
        }
    }


  export default PanelContent;

