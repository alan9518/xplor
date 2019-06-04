/* ==========================================================================
** Sharepoint People Picker Component
** 14/02/2019
** Alan Medina Silva
** ========================================================================== */
// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    // import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

    import PropTypes from 'prop-types';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class DynamicPeoplePicker extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: false,
                }
            }

            // --------------------------------------
            // Set Initial Values
            // Init Picker
            // --------------------------------------
            componentDidMount() {
                const { name, tabIndex } = this.props;
                // let pickerName = name.replace(' ', '_')
                const pickersWidth = '175px';
                // window.initializePeoplePicker(`peoplePickerOwner`, pickersWidth, 19);
                // setTimeout(() => {
                    
                    
                //     window.initializePeoplePicker(`peoplePickerOwner`, pickersWidth, 19);
                  
                    
                // }, 0);

                
               


            }   




        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */
            // --------------------------------------
            // Render DynamicPeoplePicker
            // --------------------------------------
            rennerDyanmicPeoplePicker() {
                const { name, tabIndex } = this.props;
                // let pickerName = name.replace(' ', '_')

                return (
                    <Fragment>
                        
                        <div 
                            id = {`peoplePicker${name}`}  
                            name = {`peoplePicker${name}`}  
                            className="peoplePicker form-control int-textInput ">
                        </div>
                    </Fragment>
                )
            }
            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.rennerDyanmicPeoplePicker();
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    DynamicPeoplePicker.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default DynamicPeoplePicker;