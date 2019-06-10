/* ==========================================================================
** Alert Manager Compnent
** Using rest-s-alert
** 10/06/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const AlertManager = (props) => {
        const {alertType, alertMessage} = props;
        let alert = null
        switch(alertType) {
            case 'info' :
                    alert = 
                        Alert.info(alertMessage, {
                            position: 'top',
                            effect : 'slide',
                            timeout : 2000
                        })
                    break;
            case 'error' :
                    alert = 
                        Alert.error(alertMessage, {
                            position: 'top',
                            effect : 'slide',
                            timeout : 2000
                        })
                    break;
            default :  alert = 
                        Alert.info(alertMessage, {
                            position: 'top',
                            effect : 'slide',
                            timeout : 2000
                        })
 
        }


        return alert;

     
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    AlertManager.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default AlertManager;