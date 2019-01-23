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
    import {ToggleField, FieldItem, FieldList} from '../../components'

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
        // Render Fields
        // --------------------------------------
        renderFields2() {
            const {formFields} = this.props;
            // Order By Sequence
            const orderedFormFields =  orderBy(formFields, ['attrName' , 'sequence'], ['desc', 'asc'] );
			console.log('​FieldsMaker -> renderFields -> orderedFormFields', orderedFormFields)
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------        
        renderFields() {
            const {formFields} = this.props;
            return(
                <div className="row">
                    {
                        formFields.map((tabItem, index)=> {

                            return(
                                this.setFieldType(tabItem , 6)                    
                            )
                        })               
                    }
                </div>
            )
        

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
                    formField =  <FieldItem fieldName = {attrName} fieldValue = {attrValues} colName = {divClass}/>
                break;

                case "PickList" : 
                    
                    // Split The Values to Create a List
                    const valuesArray = attrValues.split('||');
                    valuesArray.length > 1 
                        ? formField =  <FieldList fieldName = {attrName} listValues = {valuesArray} colName = {divClass}/> 
                        : formField =  <ToggleField fieldName = {attrName} fieldValue = {attrValues} colName = {divClass}/>

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
