/* ==========================================================================
 * Error Handler Component
 * Using React ErrorBoundary Class
 * https://reactjs.org/docs/error-boundaries.html
 * 29/08/2018
 * Alan Medina Silva
 ========================================================================== */


// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from 'react';
    import {MaterialButton} from '../../components';
    import { Config } from '../../Config';
 

// --------------------------------------
// Create Component
// --------------------------------------
    class ErrorBoundary extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                hasError: false,
                messageError : props.messageError || ''
            };
        }

        // --------------------------------------
        // Catch Error
        // Display Fallback UI
        // log the error to an error reporting service
        // --------------------------------------
        componentDidCatch(error, info) {
            console.log("TCL: ErrorBoundary -> componentDidCatch -> info", info)
            console.log("TCL: ErrorBoundary -> componentDidCatch -> error", error)
            this.setState({ hasError: true , messageError : error || info });
        }

        // --------------------------------------
        // Redirect User
        // --------------------------------------
        returnToHome = (e)=> {
            window.location.href = Config.spPath;
        }

        


        // --------------------------------------
        // Render Error
        // --------------------------------------
        render() {

            if (this.state.hasError) {
                // You can render any custom fallback UI
                return (
                    <div className="pti-errorContainer">
                        <div className="pti-errorImageContain">
                            <img src="https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/oops.png" alt="Error" className="pti-erroImage"/>
                            {}
                        </div>

                        <div className="pti-buttonContainer">
                                <MaterialButton type="button" outline color="primary" 
                                        onClick = {this.returnToHome}>
                                        Go Back
                                </MaterialButton>
                        </div>
                    </div>
                );
            }
            else
                return this.props.children;
        }
    }



// --------------------------------------
// Export Component
// --------------------------------------
    export default ErrorBoundary;

