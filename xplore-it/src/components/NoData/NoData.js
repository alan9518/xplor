/* ==========================================================================
 * No Data Message Component 
 * 04/12/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from 'react';
    import './styles.css'

// --------------------------------------
// Crate Component
// --------------------------------------

    const noData = ({message}) => {

        return (
                <React.Fragment>
                    <div className="xpl-loaderContainer">
                        <div className="xpl-loaderHolder">
                            <div className="xpl-erroMessageContainer">
                                <h4 className = "xpl-erroMessage"> {message}  </h4> 
                                    <h5 className = "xpl-errorSubMessage"> You Can Try to  <br></br>  Reload the Page </h5>  
                                <i className="fas fa-frown  xpl-noDataIcon"></i>
                            </div>
                        </div>
                </div>
                </React.Fragment>
            );
    }

// --------------------------------------
// Export Component
// --------------------------------------
    export default noData;