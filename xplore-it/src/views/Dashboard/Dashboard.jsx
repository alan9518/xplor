/* ==========================================================================
 * Main Dashboard Template View
 * Add Here all the Components that will show on the main Panel
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { HeaderButton } from '../../components'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {


    // --------------------------------------
    // Render Body With Dummy Layout
    // --------------------------------------
    renderDummyBody() {

    }


    // --------------------------------------
    // Render Component
    // --------------------------------------
        render() {
            return (
                <div className="container-fluid">
                    <HeaderButton/>
                    {/* <h1>Catalogue</h1> */}
                </div>
            );
        }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default Dashboard;
