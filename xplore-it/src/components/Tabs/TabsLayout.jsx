/* ==========================================================================
 * Tabs Layout 
 * 15/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Fragment } from "react";
    import PropTypes from "prop-types";
    import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
    import {AppButton} from '../../components'
    import "./styles.css";

// --------------------------------------
// Create Component Class
// --------------------------------------


    const TabsLayout = (props) => {
        const tabsData = props.tabsData;
        const currentIndex = props.currentTab
        const changePrevTab =  props.changePrevTab;
        const changeNextTab =  props.changeNextTab;
        return (
            <Fragment>           

                {/* <div className="xpl-tabArrow xpl-tabLeftArrow"> <AppButton iconLeftClass = {'fas fa-angle-left'} onClick = {changePrevTab}/> </div>
                <div className="xpl-tabArrow xpl-tabRightArrow"> <AppButton iconLeftClass = {'fas fa-angle-right'}  onClick = {changeNextTab}/></div> */}
                    
                
                {/* <Tabs currentIndex={currentIndex} onSelect={onSelect} selectedIndex = {props.tabIndex}> */}
                <Tabs  selectedIndex = {currentIndex}  onSelect = {props.onSelect} >
                    
                    <TabList>
                        <div className="xpl-scrolling-wrapper">
                            
                        {
                            tabsData.length > 0 && tabsData.map((tabItem) => {
                                console.log('tabItem', tabItem);
                                return (<Tab key = {tabItem.BusinessTypeID}> {tabItem.BusinessTypeName} </Tab>)
                            })
                        }

                         </div>

                    </TabList>

                    {
                        // tabsData.map((tabItem) => { return (<TabPanel key = {tabItem.id}>{props.children}</TabPanel>) } )

                        <TabPanel> {props.children} </TabPanel>
                    }
                </Tabs>
            </Fragment>
            
        )
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    TabsLayout.propTypes = {
        tabsData: PropTypes.array,
        defaultIndex : PropTypes.number,
        onSelect : PropTypes.func
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default TabsLayout;
