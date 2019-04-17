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
    import {ToggleField, FieldItem, FieldList, CardHeaderWide,  SingleButton} from '../../components'

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
                editControls : false
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
            const {editControls} = this.state;
            this.setState({editControls : !editControls})
        }


    
    /* ==========================================================================
    ** Render Methdos
    ** ========================================================================== */

       

        // --------------------------------------
        // Choose Between Toggle Control
        // Or Label Text
        // --------------------------------------
        setTextField(attrName, attrValues, divClass, editField) {
            if(attrValues === "N" || attrValues === "Y")
                return <ToggleField fieldName = {attrName} fieldValue = {attrValues} colName = {divClass} editField = {editField}/>
            else
                return <FieldItem fieldName = {attrName} fieldValue = {attrValues} colName = {divClass} editField = {editField}/>
        }





        // --------------------------------------
        // Set Field Type
        // Set Number of Columns
        // --------------------------------------   
        setFieldType(field, colClass, editField) {
            
            let {attrName, attrValues, datatype} = field;
            let divClass = `col-xl-${colClass} col-lg-${colClass} col-sm-12 col-xs-12`;
            let formField = null;
            switch(datatype) {
                case "String" :
                    formField =  this.setTextField(attrName, attrValues, divClass, editField);
                break;

                case "PickList" : 
                    
                    // Split The Values to Create a List
                    const valuesArray = attrValues.split('||');
                    valuesArray.length > 1 
                        ? formField =  <FieldList fieldName = {attrName} listValues = {valuesArray} colName = {divClass} editField = {editField}/> 
                        : formField =  this.setTextField(attrName, attrValues, divClass, editField);

                    break;

                default : 
                    formField =  <FieldItem fieldName = {attrName} fieldValue = {attrValues} colName = {divClass} editField = {editField}/>

            }

            return formField
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------        
        renderFields() {
            const {formFields, tabTitle} = this.props;
            const {editControls} = this.state;
            if(formFields.isOverview)
                return  <CardHeaderWide productOverview = {formFields} /> ;
            else {
                return(
                    <div className="container">
                        <div className="row">
                            <div className="xpl-editButtonContainer">

                            <h2> {tabTitle}  </h2>

                                <SingleButton 
                                    buttonText = {editControls ? "Save Content" :  "Edit Content" }
                                    buttonColor= {"primary"} 
                                    onClick = {this.toggleFieldsEdit}
                                />
                            </div>
                        </div>

                        <div className="row" style = {{height:'100%'}}>
                            {
                                formFields.map((tabItem, index)=> {
                                    let {attrValues} = tabItem;
                                    let valuesLength =  attrValues.length;
                                    let colNum = valuesLength >= 200 ? 12 : 6;
                                    return(
                                        this.setFieldType(tabItem , colNum, editControls)                    
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

        render () {
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
