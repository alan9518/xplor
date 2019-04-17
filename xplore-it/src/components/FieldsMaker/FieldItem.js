/* ==========================================================================
 ** Field Item Component
 ** 22/01/2019
 ** Alan Medina Silva
 ** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";


// --------------------------------------
// Create Component Class
// --------------------------------------
    class FieldItem extends Component {
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
			console.log("TCL: FieldItem -> setInputValue -> value", value)
			console.log("TCL: FieldItem -> setInputValue -> name", name)
            this.setState({
                inputValue: value
            })

        }

    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */

        // --------------------------------------
        // Check if the Value is a Link
        // --------------------------------------
            renderFieldLinkOrText = (value) => {
                
                // ? Regex to Find a Link
                const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

                if (regexp.test(value))
                    return <a href={value} target="_blank" rel="noopener noreferrer"> {value} </a>
                else
                    return <p> {value}  </p>
            }


        // ?--------------------------------------
        // ? Choose Between Field Input or Text Area
        // ?--------------------------------------
        setFieldInputOrTextArea = (fieldName, value) => {
            if(value.length < 200) 
                return <input type = "text" value = {value} className = "xpl-fieldEditInput" onChange = {this.setInputValue} name= {fieldName}/>

            else
                return <textarea value = {value} className = "xpl-fieldEditInput" onChange = {this.setInputValue} name= {fieldName} cols="30" rows="10"></textarea>
        }


        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderFieldItem() {
            
            const { colName, fieldName,  editField } = this.props;
            const {inputValue} = this.state;

            return (
                <div className={colName}>

                    <div className="xpl-fieldItem">

                        <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>
                        { editField === true 
                            ? this.setFieldInputOrTextArea(fieldName,inputValue)
                            : this.renderFieldLinkOrText(inputValue)
                        
                        }

                    </div>
                </div>
            )
        }
        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderFieldItem();
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldItem.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldItem.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldItem;
