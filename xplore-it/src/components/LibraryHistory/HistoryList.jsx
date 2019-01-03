/* ==========================================================================
 * User Library History Component 
 * 13/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component , Fragment} from "react";
    // import PropTypes from "prop-types";
    // import { AppButton } from '../../components';



// --------------------------------------
// Create Component Class
// --------------------------------------
    class HistoryList extends Component {


        // --------------------------------------
        // Render History List
        // --------------------------------------
        renderHistoryList() {
            return (
                <Fragment>
                    <h4> Items you have added to library </h4>

                    {/* <div className="xpl-listHistoryContainer">
                        <ul>
                            <li> <AppButton iconClass = {'far fa-edit'}  buttonText = {"Communication"} /> </li>
                        </ul>
                    </div> */}

                </Fragment>
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderHistoryList();
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // HistoryList.propTypes = {
    // prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default HistoryList;
