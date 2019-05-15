/* ==========================================================================
 * Fields Maker Component For Product Details Attributes
 * 05/11/2018
 * Alan Medina Silva 
//  ========================================================================== */


// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { ToggleField, FieldItem, FieldList, CardHeaderWide, SingleButton, FieldDate, FieldPicker, AddProjectForm } from '../../components'
    import moment from 'moment';




// --------------------------------------
// Create Component Class
// --------------------------------------
    class FieldsMaker extends Component {


        /* ==========================================================================
        ** Compomenet Setup
        ** ========================================================================== */

            // --------------------------------------
            // constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    editControls: this.props.editFields || false,
                    parentTabHeight : 0
                }
                // this.parentTabHeight = document.getElementsByClassName('rc-tabs-tabpane-active')[0].clientHeight
            }


            componentDidMount() {
                this.setState({
                    parentTabHeight: document.getElementsByClassName('rc-tabs-tabpane-active')[0].clientHeight
                })
            }




            /* ==========================================================================
            ** Handle State
            ** ========================================================================== */

            // --------------------------------------
            // Enable Edition of Fields
            // --------------------------------------
            toggleFieldsEdit = (event) => {
                event.preventDefault();
                const { editControls } = this.state;
                
                // ? Change Tab Height
                editControls === true 
                    ? document.getElementsByClassName('rc-tabs-tabpane-active')[0].style = '1200px'
                    : document.getElementsByClassName('rc-tabs-tabpane-active')[0].style = this.state.parentTabHeight
                
                this.setState({ editControls: !editControls })
            }


            // --------------------------------------
            // Convert String to Moment Object
            // --------------------------------------
            convertStringToMomentObject(date) {
                let dateObj = new Date(date);
                let momentObj = moment(dateObj);
                //console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> momentObj', momentObj)

                return momentObj;
            }



        /* ==========================================================================
        ** Render Methdos
        ** ========================================================================== */



            // --------------------------------------
            // Choose Between Toggle Control
            // Or Label Text
            // --------------------------------------
            setTextField(attrName, attrValues, divClass, editField) {
                if (attrValues === "false" || attrValues === "true")
                    return <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} />
                else
                    return <FieldItem fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} isTextArea={true} />
            }


            // --------------------------------------
            // Set PeoplePciker Control
            // Or Label Text
            // --------------------------------------
            setDatePickerField(attrName, attrValues, divClass, editField) {
                console.log("TCL: FieldsMaker -> setDatePickerField -> attrValues", attrValues)
                // let dateValue =  this.convertStringToMomentObject(attrValues);
                // console.log("TCL: FieldsMaker -> setDatePickerField -> dateValue", dateValue)
                

                return (
                    <FieldDate
                        name={attrName}
                        colName={divClass}
                        fieldName = {attrName}
                        // onDateChange = {props.onDateChange}
                        inputValue = {attrValues}
                        editField={editField}
                        // tabIndex = {Sequence}
                    />
                )

               
            }


            setTextPeoplePicker(attrName, attrValues, divClass, editField) {
                return (
                    <FieldPicker
                        fieldName={attrName}
                        fieldValue={attrValues}
                        editField={editField}
                        inputName={attrName}
                        colName={'col-md-12 col-lg-12'}
                    // onPickerChange = {this.onChangeInput}
                    />
                )
            }





            // --------------------------------------
            // Set Field Type
            // Set Number of Columns
            // --------------------------------------   
            setFieldType(field, colClass, editField) {

                try {
                    let { attrName, attrValues, datatype } = field;
                    let divClass = `col-xl-${colClass} col-lg-${colClass} col-sm-12 col-xs-12`;
                    let formField = null;
                    switch ((datatype.toLowerCase())) {
                        //? Text Input Field
                        case "string":
                            formField = this.setTextField(attrName, attrValues, divClass, editField);
                            break;

                        //? CheckboxList
                        case "picklist":

                            //? Split The Values to Create a List
                            const valuesArray = attrValues.split('||');
                            valuesArray.length > 1
                                ? formField = <FieldList fieldName={attrName} listValues={valuesArray} colName={divClass} editField={editField} />
                                : formField = this.setTextField(attrName, attrValues, divClass, editField);

                            break;

                        case "boolean":
                            formField = <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} />
                            break;

                        //? Sharepoint PeoplePicker
                        case "peoplepicker":
                            formField = this.setTextPeoplePicker(attrName, attrValues, divClass, editField);
                            break;

                        //? DatePicker
                        case "date":
                            formField = this.setDatePickerField(attrName, attrValues, divClass, editField);
                            break;

                        //? Text Input Field
                        default:
                            formField = <FieldItem fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} />

                    }

                    return formField
                }

                catch (error) {
                    console.log("TCL: FieldsMaker -> setFieldType -> error", error)
                    throw new Error({ 'error': error });
                }
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------        
            renderFields() {
                const { isOverview, formFields, tabTitle, newProject } = this.props;
                const { editControls } = this.state;

                if (isOverview) {

                    if (newProject)
                        return <AddProjectForm productOverview={formFields} />;
                    else
                        return <CardHeaderWide productOverview={formFields} />;

                }


                else {
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="xpl-editButtonContainer">

                                    <h2> {tabTitle}  </h2>

                                    <SingleButton
                                        buttonText={editControls ? "Save Content" : "Edit Content"}
                                        buttonColor={"primary"}
                                        onClick={this.toggleFieldsEdit}
                                    />
                                </div>
                            </div>

                            <div className="row" style={{ height: '100%' }}>
                                {
                                    formFields.map((tabItem, index) => {
                                        let { attrValues } = tabItem;
                                        let valuesLength = attrValues.length;
                                        let colNum = valuesLength >= 200 ? 12 : 6;
                                        return (
                                            this.setFieldType(tabItem, colNum, editControls)
                                        )
                                    })
                                }
                            </div>

                        </div>

                    )
                }

        }




        // --------------------------------------
        // Render Component
        // --------------------------------------   

        render() {
            return (this.renderFields())
        }




    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldsMaker.propTypes = {
        formFields: PropTypes.array
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldsMaker;
