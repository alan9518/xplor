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
    // import styles from "react-tabs/style/react-tabs.css";
    import "./styles.css";

// --------------------------------------
// Create Component Class
// --------------------------------------


    const TabsLayout = (props) => {
        const tabsData = props.tabsData;
        const defaultIndex = props.defaultIndex
        const onSelect = props.onSelect;
        return (
            <Fragment>                           
                <Tabs defaultIndex={defaultIndex} onSelect={onSelect} >
                    <TabList>
                        <div className="xpl-scrolling-wrapper">
                        {
                            tabsData.length > 0 && tabsData.map((tabItem) => {
                                return (<Tab key = {tabItem.title}> {tabItem.title} </Tab>)
                            })
                        }
                         </div>
                    </TabList>

                    {
                        tabsData.map((tabItem) => { return (<TabPanel key = {tabItem.id}>{props.children}</TabPanel>) } )
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
