/* ==========================================================================
 * App Details Layout 
 * 05/11/2018
 * using rc-tabs
 * http://react-component.github.io/tabs/
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import 'rc-tabs/assets/index.css';
    import React , {Component, Fragment} from 'react';
    import ReactDOM from 'react-dom';
    import Tabs, { TabPane } from 'rc-tabs';
    import TabContent from 'rc-tabs/lib/TabContent';
    import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
    import PanelContent from './PanelContent';


 

// --------------------------------------
// Create Component Class
// --------------------------------------
    class CustomTabs extends Component {

        /* ==========================================================================
        *  Component Setup
        ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    // start: businesArray[0],
                    tabKey: 0,
                }
            }

    
        /* ==========================================================================
         * State & Logic Functions
           ========================================================================== 
        */


            onTabClick = (key) => {
                console.log(`onTabClick ${key}`);
                this.setState({
                  tabKey: key,
                });
              }
            


        /* ==========================================================================
        * Render Methods
        ========================================================================== */

            
            onChange = (e) => {
                console.log('e',e)
            }

            onTabChange = (BusinessTypeID) => {
                // const {onTabChange} = this.props;

                this.props.onTabChange(3088)

            }


            renderTabs() {
                const {tabsData} = this.props;
                return (
                    <Fragment>

                        <Tabs
                         
                            renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick}/>}
                            renderTabContent={() => <TabContent/>}
                            onChange={this.onTabChange}
                        >
                            
                            {
                            // Iterate Data to Create tabs Header

                                tabsData.map((tabContent)=> {
                                    return (
                                        <TabPane tab = {tabContent.BusinessTypeName} key={tabContent.BusinessTypeID} id={tabContent.BusinessTypeID} >       
                                            <PanelContent panelTabContent = {tabContent.Sequence}/> 
                                        </TabPane>
                                    )
                                })
                            }

                        </Tabs>

                    </Fragment>
                )
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
                render() {
                    return this.renderTabs();
                }
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default CustomTabs;
