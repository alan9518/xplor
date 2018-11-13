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
    import { AppButton} from '../../components';

// --------------------------------------
// Create Component Class
// --------------------------------------
    const AppModal = (props) => {

        const {show, children, handleClose, modalTitle} = props;
        const showHideClassName = show ? "xpl-appModal display-block" : "modal display-none";

        // --------------------------------------
        // Render Modal
        // --------------------------------------
            return (
                <div className = {showHideClassName}>
                    <section className="xpl-closButtonContainer">
                            <AppButton 
                                    buttonClass = {'xpl-closeModalButton'} 
                                    onClick = {handleClose } 
                                    iconClass = {'fas fa-times-circle'}
                            />
                    </section>

                    <section className="xpl-appModal-main xpl-shadow" >

                        

                        <div className="xpl-modalHeader">
                            <h3> {modalTitle} </h3>
                        </div>

                        {React.Children.map(props.children, child => {
                            console.log('props.children', props.children);
                            console.log('child', child);
                            
                        }) }


                        {children}

                        <div className="xpl-modalFooter">
                            {/* <button onClick={handleClose}>close</button> */}
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
