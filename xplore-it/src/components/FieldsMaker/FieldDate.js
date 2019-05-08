/* ==========================================================================
 ** Field Date Component
 ** 22/01/2019
 ** Alan Medina Silva
 ** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component } from "react";
    import { DatePicker } from '../../components'
    import PropTypes from "prop-types";


// --------------------------------------
// Create Component Class
// --------------------------------------
class FieldDate extends Component {
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
            console.log("TCL: FieldDate -> setInputValue -> value", value)
            console.log("TCL: FieldDate -> setInputValue -> name", name)
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
        renderFieldDate() {
            
            const { colName, fieldName,  editField } = this.props;
            const {inputValue} = this.state;

            return (
                <div className={colName}>

                    <div className="xpl-fieldItem">

                        <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>
                        { editField === true 
                            ? <DatePicker 
                                    name = {fieldName}
                                    // onDateChange = {props.onDateChange}
                                    initialValue = {inputValue}
                                    editField = {editField}
                                    readOnly = {!editField}
                                    // tabIndex = {Sequence}
                                />
                            : <p> {inputValue}  </p>
                        }
                        
                        

                    </div>
                </div>
            )
        }

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderFieldDate();
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldDate.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldDate.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldDate;
