/* ==========================================================================
** Custom People Picker Component
** 03/06/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import axios from 'axios'
    import PropTypes from 'prop-types';
// --------------------------------------
// Create Component Class
// --------------------------------------
    class CustomPicker extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    userValue : '',
                    isLoaded: false,
                }
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                this.getUserInfo().then((data) => {
                    console.log("TCL: CustomPicker -> componentDidMount -> data", data)
                    
                })
                .catch((error) => {
                console.log("TCL: CustomPicker -> componentDidMount -> error", error)
                    
                })
            }



            handleKeyPress = (event) => {
                console.log("TCL: CustomPicker -> handleKeyPress -> event", event)
                // const {tar}
            }



        /* ==========================================================================
        ** API Connecytions
        ** ========================================================================== */


            async getUserInfo() {
            
                // let appweburl = decodeURIComponent(getQueryStringParameter('SPAppWebUrl'));
                // let hostweburl = decodeURIComponent(getQueryStringParameter('SPHostUrl'));
                let restSource = "https://flextronics365.sharepoint.com/sites/xplorit_portal/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
            
 
                return axios({
                    method : 'POST',
                    url : restSource,
                    data : JSON.stringify({
                        'queryParams':{
                            '__metadata':{
                                'type':'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
                            },
                            'AllowEmailAddresses':true,
                            'AllowMultipleEntities':false,
                            'AllUrlZones':false,
                            'MaximumEntitySuggestions':50,
                            'PrincipalSource':15,
                            'PrincipalType': 'User,DL,SecGroup,SPGroup',
                            'QueryString':'alan'
                            //'Required':false,
                            //'SharePointGroupID':null,
                            //'UrlZone':null,
                            //'UrlZoneSpecified':false,
                            //'Web':null,
                            //'WebApplicationID':null
                        }
                    }),
                    headers : {
                        'accept':'application/json;odata=verbose',
                        'content-type':'application/json;odata=verbose',
                        'X-RequestDigest': document.getElementById('__REQUESTDIGEST').value
                    }

                })
            }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */
            // --------------------------------------
            // Render CustomPicker
            // --------------------------------------
            renderCustomPicker() {
                const { colName, fieldName, inputName, editField, isTextArea, useParentState } = this.props;
                const {userValue} = this.state;
                return (
                    <div className={colName}>
    
                        <div className="xpl-fieldItem">
    
                            <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>
                            <input 
                                type = "text" 
                                value = {userValue} 
                                className = "xpl-fieldEditInput" 
                                onChange = {this.setInputValue} 
                                name= {inputName || fieldName}
                                onKeyPress = {this.handleKeyPress} />
    
                        </div>
                    </div>
                )
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderCustomPicker();
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    CustomPicker.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default CustomPicker;