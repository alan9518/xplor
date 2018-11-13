/* ==========================================================================
 * User Library History Component 
 * 13/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component , Fragment} from "react";
    import PropTypes from "prop-types";



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
                    <h4> Items you have added to to library </h4>

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
