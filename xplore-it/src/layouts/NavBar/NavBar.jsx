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
    import {ProfileImage, ProjectLink} from '../../components';

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


        /* ==========================================================================
         *  Render Methods
         ========================================================================== */


            // --------------------------------------
            // Render NavBar
            // --------------------------------------
            renderNavBar(logo) {
                const SP_user = window.getCurrentSPUser();
                const {user_email, user_name} = SP_user;
                return (
                    <div className="xpl-appHeaderContainer">
                        <nav className="navbar navbar-expand-md navbar-dark fixed-top xpl-appHeader">
                            <div className="navbar-brand" >
                                <img src={logo}  className="xpl-appLogo d-inline-block align-top" alt=""/>
                            </div>
                    

                            <div className ={`navbar-collapse collapse show`} id="xpl-appNavBar" >
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active xpl-userProfileLink" >
                                        <ProjectLink route = {`user/details/2`} spRoute = {true}>
                                            <span className="nav-link xpl-userName">
                                                Welcome {user_name} <span className="sr-only">(current)</span>
                                            </span>
                                        </ProjectLink>
                                        <div className="xpl-userImage">
                                            <ProfileImage resourceMail = {user_email}/>
                                        </div>
                                    </li>

                                    
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