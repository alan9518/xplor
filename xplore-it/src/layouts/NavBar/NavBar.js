/* ==========================================================================
 * NavBar Component  
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */


// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment }  from 'react'
    import PropTypes from 'prop-types';



// --------------------------------------
// Create Component Class
// --------------------------------------
    class NavBar extends Component {

        // --------------------------------------
        // Render NavBar
        // --------------------------------------
        renderNavBar(logo) {
            return (
                <div className="xpl-appHeader">
                    <nav className="navbar navbar-dark ">
                        <a className="navbar-brand" href="#">
                            <img src={logo}  className="xpl-appLogo d-inline-block align-top" alt=""/>
                        </a>
                    </nav>
                </div>
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            const {logo} =  this.props;
            return (
                <Fragment>
                    {this.renderNavBar(logo)}
                </Fragment>
                )
            }
        }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    NavBar.propTypes = {
        logo: PropTypes.string
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default NavBar; 