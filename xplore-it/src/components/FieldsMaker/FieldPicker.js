/* ==========================================================================
 ** Field Item Component
 ** 22/01/2019
 ** Alan Medina Silva
 ** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component } from "react";
    import {SPPeoplePicker} from '../../components'
    import PropTypes from "prop-types";


// --------------------------------------
// Create Component Class
// --------------------------------------
class FieldPicker extends Component {
    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */
        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                inputValue: '',
                isLoaded : false
            };
        }

        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        componentDidMount() {
            const {fieldValue} = this.props;
            this.setState({inputValue : fieldValue, isLoaded : true});

        }



        // ?--------------------------------------
        // ? Change State Value
        // ?--------------------------------------
        setInputValue = (event)=> {
            const {target} = event;
            const {name, value} = target;
            console.log("TCL: FieldPicker -> setInputValue -> value", value)
            console.log("TCL: FieldPicker -> setInputValue -> name", name)
            this.setState({
                inputValue: value
            })

        }

    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */

      
        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderFieldPicker() {
            
            const { colName, fieldName,  editField, inputName, onPickerChange } = this.props;
            const {inputValue} = this.state;

            return (
                <div className={colName}>

                    <div className="xpl-fieldPicker">

                        <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>
                        { editField === true 
                            ? <SPPeoplePicker name={inputName} value={inputValue} onChange={onPickerChange} />
                            :  <p> {inputValue}  </p>
                        
                        }

                    </div>
                </div>
            )
        }
        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderFieldPicker();
        }
}

// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldPicker.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldPicker.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };

// --------------------------------------
// Export Component
// --------------------------------------
export default FieldPicker;
