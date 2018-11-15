/* ==========================================================================
 * App Button With Material Design 
 * 09/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";
    import './styles.css';


    // --------------------------------------
    // Create and Export Component
    // xpl-toggleButton
    // --------------------------------------
    const MaterialButton = (props) => {
        // const {isSubmit, buttonText} =  this.props;
        const classNames = `pure-material-button-contained xpl-${props.buttonColor}`

        return (
            <div className = 'xpl-materialButton'>

                {
                    props.isSubmit === true 
                    ? <input  type="submit" value = {props.buttonText} className={classNames} />
                    : <button type = "button" className={classNames}>{props.buttonText}</button>  
                }

                
            </div>
                
        )
    };

// --------------------------------------
// Prop Types
// --------------------------------------
    MaterialButton.propTypes = {
        onClick: PropTypes.func,
        buttonClass : PropTypes.string,
        buttonText : PropTypes.string,
        iconClass : PropTypes.string,
        buttonColor : PropTypes.string
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default MaterialButton;
