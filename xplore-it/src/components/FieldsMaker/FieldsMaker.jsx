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
import { ToggleField, FieldItem, FieldList, CardHeaderWide, SingleButton,DatePicker, NewProject, AddProjectForm } from '../../components'

// import {orderBy} from 'lodash'; 

// import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard} from '../../components';


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
            editControls: this.props.editFields || false
        }
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
        this.setState({ editControls: !editControls })
    }



    /* ==========================================================================
    ** Render Methdos
    ** ========================================================================== */



    // --------------------------------------
    // Choose Between Toggle Control
    // Or Label Text
    // --------------------------------------
    setTextField(attrName, attrValues, divClass, editField) {
        if (    attrValues === "false" || attrValues === "true")
            return <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} />
        else
            return <FieldItem fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} isTextArea = {true}/>
    }


    // --------------------------------------
    // Set PeoplePciker Control
    // Or Label Text
    // --------------------------------------
    setDatePickerField(attrName, attrValues, divClass, editField) {
       return <DatePicker 
                    name = {attrName}
                    colName = {divClass}
                    // onDateChange = {props.onDateChange}
                    initialValue = {attrValues}
                    editField = {editField}
                    // readOnly = {!Enabled}
                    // tabIndex = {Sequence}
                />
    }





    // --------------------------------------
    // Set Field Type
    // Set Number of Columns
    // --------------------------------------   
    setFieldType(field, colClass, editField) {

        let { attrName, attrValues, datatype } = field;
        let divClass = `col-xl-${colClass} col-lg-${colClass} col-sm-12 col-xs-12`;
        let formField = null;
        switch (datatype) {
            // Text Input Field
            case "String":
                formField = this.setTextField(attrName, attrValues, divClass, editField);
                break;

            // CheckboxList
            case "PickList":

                // Split The Values to Create a List
                const valuesArray = attrValues.split('||');
                    valuesArray.length > 1
                        ? formField = <FieldList fieldName={attrName} listValues={valuesArray} colName={divClass} editField={editField} />
                        : formField = this.setTextField(attrName, attrValues, divClass, editField);

                break;

            case "Boolean" :    
                formField = <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} />
                break;

            // Sharepoint PeoplePicker
            // case "peoplePicker":
            //     formField = this.setTextPeoplePicker(attrName, attrValues, divClass, editField);
            //     break;

            // DatePicker
            case "date":
                formField = this.setDatePickerField(attrName, attrValues, divClass, editField);
                break;

            // Text Input Field
            default:
                formField = <FieldItem fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField} />

        }

        return formField
    }


    // --------------------------------------
    // Render Component
    // --------------------------------------        
    renderFields() {
        const {isOverview, formFields, tabTitle, newProject } = this.props;
        const { editControls } = this.state;

        if (isOverview)  {

            if(newProject) 
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
