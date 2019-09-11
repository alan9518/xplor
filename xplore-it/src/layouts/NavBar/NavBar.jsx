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
    import {ProfileImage, ProjectLink, AppButton} from '../../components';

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


        onHomeLinkClick = (event) => {

            event.preventDefault()
            console.log("TCL: NavBar -> onHomeLinkClick -> event", event);

            this.props.resetSidebarMenu()
            
        }


        /* ==========================================================================
        *  Render Methods
        ========================================================================== */


            // --------------------------------------
            // Render NavBar
            //     <ProjectLink route = {'/'} spRoute = {true} >
            //     <img src={logo}  className="xpl-appLogo d-inline-block align-top" alt=""/>
            //     <span className = "xpl-subTitle"> Product Explorer  </span>
            // </ProjectLink>
            // --------------------------------------
            renderNavBar(logo) {
                const SP_user = window.getCurrentSPUser();
                const {user_email, user_name} = SP_user;
                return (
                    <div className="xpl-appHeaderContainer">
                        <nav className="navbar navbar-expand-md navbar-dark fixed-top xpl-appHeader">
                            <div className="navbar-brand" onClick = {this.onHomeLinkClick}>
                                <div onClick = {this.props.resetSidebarMenu} style = {{cursor:'pointer'}}>
                                    <img src={logo}  className="xpl-appLogo d-inline-block align-top" alt=""/>
                                    <span className = "xpl-subTitle"> Product Explorer  </span>
                                </div>
                            </div>
                    

                            <div className ={`navbar-collapse collapse show`} id="xpl-appNavBar" >
                                <ul className="navbar-nav ml-auto">

                                <a href  = "https://flextronics365.sharepoint.com/sites/xplorit_portal/xplorit_collaboration_forum/SitePages/Community%20Home.aspx" target = "_blank" rel="noopener noreferrer">
                                
                                        <li className="nav-item active xpl-userProfileLink">

                                                    <span className="nav-link xpl-userName" style ={{color : '#FFFFFF'}}>
                                                        Collaboration Forum 
                                                    </span>

                                            
                                        </li>

                                    </a>
                                

                                

                                    <li role="separator" class="divider nav-item active xpl-userProfileLink" 
                                        style= {{position: 'relative' }}>   
                                            <span style = {{fontSize: '30px',   position: 'absolute',  top: '-4px' ,left: '-4px',  right: 0}}> 
                                              | 
                                            </span>   
                                    </li>
                                


                                <a href  = "https://flextronics365.sharepoint.com/_layouts/15/me.aspx?v=profile" target = "_blank" rel="noopener noreferrer" >
                                    <li className="nav-item active xpl-userProfileLink" >
                                        
                                            <span className="nav-link xpl-userName">
                                                Welcome {user_name} <span className="sr-only">(current)</span>
                                            </span>
                                        
                                            <div className="xpl-userImage">
                                                <ProfileImage resourceMail = {user_email}/>
                                            </div>
                                        
                                    </li>
                                </a>
                                    
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