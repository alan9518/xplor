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
    import {ProfileImage} from '../../components'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class NavBar extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                show : '' ,
            }
        }



        // --------------------------------------
        // Get Initial Width
        // --------------------------------------
        getInitialWidth() {
            let screenWidth =  window.innerWidth;
            return screenWidth > 768 ? '':'show'
        }


        // --------------------------------------
        // Set Responsive Menu Click based on State
        // --------------------------------------
        showMenu = () =>{
            const {show} = this.state;
            return show === true ? 'show' : ''
        }


        // --------------------------------------
        // Toggle Menu on Mobile
        // --------------------------------------
        onMenuClick = (e) => {
            const {show} = this.state;
            this.setState({show:!show});
        }




        // --------------------------------------
        // Render NavBar
        // --------------------------------------
        renderNavBar(logo) {
            const {show} =  this.state;
            return (
                <div className="xpl-appHeaderContainer">
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top xpl-appHeader">
                        <a className="navbar-brand" href="#">
                            <img src={logo}  className="xpl-appLogo d-inline-block align-top" alt=""/>
                        </a>
                        <button onClick = {this.onMenuClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#xpl-appNavBar"
                            aria-controls="xpl-appNavBar" aria-expanded="true" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className ={`navbar-collapse collapse ${this.showMenu()}`} id="xpl-appNavBar" >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active xpl-userProfileLink" >
                                    <a className="nav-link xpl-userName" href="#">Welcome Alan Medina <span className="sr-only">(current)</span></a>
                                    <div className="xpl-userImage">
                                        <ProfileImage resourceMail = {"alan.medina@flex.com"}/>
                                    </div>
                                </li>

                                {/* <li>
                                    <div className="xpl-userImage">
                                        <ProfileImage resourceMail = {"alan.medina@flex.com"}/>
                                    </div>
                                </li> */}
                                
                            </ul>
                        </div>
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