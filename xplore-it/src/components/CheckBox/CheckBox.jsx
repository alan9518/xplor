/* ==========================================================================
** CheckBox Item Component
** 22/04/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import './styles.css';


// --------------------------------------
// Create Component Class
// --------------------------------------
class CheckBox extends Component {
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
        // --------------------------------------
        componentDidMount() {
            // Apply the indeterminate attribute of the checkbox input
            this.selector.indeterminate = this.props.indeterminate;
        }
        
        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        componentDidUpdate(prevProps) {
            if (prevProps.indeterminate !== this.props.indeterminate) {
            this.selector.indeterminate = this.props.indeterminate;
            }
        }
    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */

        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderCheckBox() {

            const { id, label, type, indeterminate, hasError, value, ...inputProps } = this.props;
            console.log("TCL: CheckBox -> renderCheckBox -> inputProps", inputProps)
            
            const checkboxClassname = `
              m-checkbox
              ${type === 'switch' && 'm-checkbox--switch'}
              ${hasError && 'm-checkbox--has-error'}
            `;
            
            const inputClassname = `
              m-checkbox__input
              ${type === 'switch' && 'm-checkbox--switch__input'}
              ${hasError && 'm-checkbox--has-error__input'}
            `;
            
            const labelClassname = `
              m-checkbox__label
              ${type === 'switch' && 'm-checkbox--switch__label'}
            `;
            
            return (
                <Fragment>
                    <div className={checkboxClassname}>
                        <input
                          type="checkbox"
                          className={inputClassname}
                          ref={el => (this.selector = el)}
                          id={id}
                          value = {value}
                          {...inputProps}
                        />
                          <label className={labelClassname} htmlFor={id}>{label}</label>
                      </div>
                
                  
                
                </Fragment>
            )
        }
        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderCheckBox();
        }
}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    CheckBox.propTypes = {
        hasError: PropTypes.bool,
        id: PropTypes.string.isRequired,
        indeterminate: PropTypes.bool,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['default', 'switch']),
    };


// -------------------------------------- 
// Defalut Prpos
// -------------------------------------- 
    CheckBox.defaultProps = {
        hasError: false,
        indeterminate: undefined,
        type: 'default',
      };
// --------------------------------------
// Export Component
// --------------------------------------
export default CheckBox;