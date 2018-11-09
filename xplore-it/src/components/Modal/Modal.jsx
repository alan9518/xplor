/* ==========================================================================
 * Custom LitgthBox Copmponent  
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";
    import './styles.css';


// --------------------------------------
// Create Component Class
// --------------------------------------
    const AppModal = (props) => {

        const {show, children, handleClose} = props;
        const showHideClassName = show ? "xpl-appModal display-block" : "modal display-none";

        // --------------------------------------
        // Render Modal
        // --------------------------------------
            return (
                <div className = {showHideClassName}>
                    <section className="xpl-appModal-main xpl-shadow" >

                        <div className="xpl-modalHeader">
                            <h3> Modal Header </h3>
                        </div>



                        {children}

                        <div className="xpl-modalFooter">
                            <button onClick={handleClose}>close</button>
                        </div>
                    </section>
                </div>
            );
        
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // AppModal.propTypes = {
    // prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default AppModal;
