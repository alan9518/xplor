/* ==========================================================================
 * Fields Maker Component For Product Details Attributes
 * 05/11/2018
 * Alan Medina Silva
//  ========================================================================== */


// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment } from "react";
    import PropTypes from "prop-types";
    import {ToggleField, FieldItem, FieldList, CardHeaderWide} from '../../components'

    import {orderBy} from 'lodash';

    // import { Breadcumbs, AppLoader,  CustomTabs, PanelContent, ProjectCard} from '../../components';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class FieldsMaker extends Component {

        // --------------------------------------
        // constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.formControls = [
                {name : 'input', type : ['text', 'password', 'email','phone'], soportedType : 'string'},
                {name : 'selectList', type : [], soportedType : 'PickList'},
                {name : 'datepicker', type : [], soportedType : 'date'},
                {name : 'toggle', type : 'boolean', soportedType : ['string' ,'boolean']},
            ]
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------        
        renderFields() {
            const {formFields} = this.props;
            if(formFields.isOverview)
                return  <CardHeaderWide productOverview = {formFields} /> ;
            else {
                return(
                    <div className="row" style = {{height:'100%'}}>
                        {
                            formFields.map((tabItem, index)=> {
                                let {attrValues} = tabItem;
                                let valuesLength =  attrValues.length;
                                let colNum = valuesLength >= 200 ? 12 : 6;
                                return(
                                    this.setFieldType(tabItem , colNum)                    
                                )
                            })               
                        }
                    </div>
                )
            }

        }   



        // --------------------------------------
        // Choose Between Toggle Control
        // Or Label Text
        // --------------------------------------
        setTextField(attrName, attrValues, divClass) {
            if(attrValues === "N" || attrValues === "Y")
                return <ToggleField fieldName = {attrName} fieldValue = {attrValues} colName = {divClass}/>
            else
                return <FieldItem fieldName = {attrName} fieldValue = {attrValues} colName = {divClass}/>
        }





        // --------------------------------------
        // Set Field Type
        // Set Number of Columns
        // --------------------------------------   
        setFieldType(field, colClass) {
            let {attrName, attrValues, datatype} = field;
            let divClass = `col-xl-${colClass} col-lg-${colClass} col-sm-12 col-xs-12`;
            let formField = null;
            switch(datatype) {
                case "String" :
                    formField =  this.setTextField(attrName, attrValues, divClass);
                break;

                case "PickList" : 
                    
                    // Split The Values to Create a List
                    const valuesArray = attrValues.split('||');
                    valuesArray.length > 1 
                        ? formField =  <FieldList fieldName = {attrName} listValues = {valuesArray} colName = {divClass}/> 
                        : formField =  this.setTextField(attrName, attrValues, divClass);

                    break;

                default : 
                    formField =  <FieldItem fieldName = {attrName} fieldValue = {attrValues} colName = {divClass}/>

            }

            return formField
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
