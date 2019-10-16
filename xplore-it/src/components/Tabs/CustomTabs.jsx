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
    import Tabs, { TabPane } from 'rc-tabs';
    import TabContent from 'rc-tabs/lib/TabContent';
    import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';




// --------------------------------------
// Create Component Class
// --------------------------------------
class CustomTabs extends Component {



    // --------------------------------------
    // Change Current TabState and Send 
    // Tab Key to Details View
    // --------------------------------------
    onTabClick = (key) => {
        console.log("TCL: CustomTabs -> onTabClick -> key", key)
        this.props.onTabChange(key)
    }

    // onTabChange = (event) => {
    //     console.log("TCL: CustomTabs -> onTabChange -> event", event)
        
    // }
    



    // TCL: CustomTabs -> onTabClick -> key 3095
    // TCL: CustomTabs -> onTabClick -> key 0

/* ==========================================================================
 * Render Methods
   ========================================================================== */

    // --------------------------------------
    // Render Tabs Content
    // --------------------------------------
    renderTabs() {
        const {tabsData, children} = this.props;
        return (
            <Fragment>

                <Tabs
                    onChange = {this.onTabChange}                        
                    renderTabBar = {() => <ScrollableInkTabBar onTabClick = {this.onTabClick}/>}
                    renderTabContent = {() => <TabContent/>}
                    >    
                    {
                    // Iterate Data to Create tabs Header

                        tabsData.length > 0 && tabsData.map((tabDataItem)=> {
                            
                            return (
                                <TabPane tab = {tabDataItem.BusinessTypeName} key={tabDataItem.BusinessTypeID} id={tabDataItem.BusinessTypeID} >       
                                    {/* <PanelContent tabLoading = {tabLoading} panelTabContent = {paneContent} />  */}
                                    {children}
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
