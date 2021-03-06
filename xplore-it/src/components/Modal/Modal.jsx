/* ==========================================================================
 * Custom LitgthBox Copmponent  
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    // import PropTypes from "prop-types";
    import "./styles.css";
    import { AppButton } from "../../components";

// --------------------------------------
// Create Component Class
// --------------------------------------
    const AppModal = props => {
        const { show, children, handleClose, modalTitle } = props;
        const showHideClassName = show ? "xpl-appModal display-block" : "modal display-none";

            // --------------------------------------
            // Render Modal
            // Iterate the Modal Child Components
            // To determine the body and Footer
            // --------------------------------------
            return (
                <div className={showHideClassName}>

                    <section className="xpl-appModal-main xpl-shadow">
                        <AppButton
                                buttonClass={"xpl-closeModalButton"}
                                onClick={handleClose}
                                iconClass={"fas fa-times-circle"}
                            />
                        <div className="xpl-modalBodyScroll">
                        <div className="xpl-modalHeader">
                            <h4> {modalTitle} </h4>
                        </div>

                        
                        {React.Children.map(children, child => {
                            if (child.key === "ModalBody") 
                                return (child);
                            else if (child.key === "ModalFooter")
                                return <div className="xpl-modalFooter">{child}</div>;
                        })}
                        </div>

                        
                    </section>
                </div>
            );
    };

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
