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
    import {ListItem,} from '../../components'
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
            const rows =  Math.round(12/3) ;
			console.log("​FieldsMaker -> renderFields -> rows", rows)


            // <div className="row">
            //                 <div className="col-lg-3">
            //                     {/* <p> {tabItem.attrName} </p> */}
            //                     {/* <ul>     */}
            //                         <ListItem itemName = {tabItem.attrName} content = {tabItem.attrName} />
            //                         {/* <ListItem itemName = {"Product Type"} content = {ProductType} /> */}
            //                     {/* </ul> */}
            //                 </div>
            //            </div>


            return(
                <div className="row">
                    {formFields.map((tabItem, index)=> {
                        return(
                            this.setFieldType(tabItem , rows )                    
                        )
                    })               
                }
                </div>
            )
           
            // Iterate Fields to Detect DataType

        }


        // --------------------------------------
        // Set Field Type
        // --------------------------------------   
        setFieldType(field, colClass) {
            let {attrName, attrValues, dataType, maxLength, sequence} = field;
            let divClass = `col-lg-${colClass}`;
            let formField = null;
            switch(dataType) {
                case 'String' :
                    formField =  <ListItem itemName = {attrName} content = {attrName} classNames = {divClass}/>
                break;

                case 'PickList' : 
                    formField =  <ListItem itemName = {attrName} content = {attrName} classNames = {divClass}/>
                    break;
                default : 
                    formField =  <ListItem itemName = {attrName} content = {attrName} classNames = {divClass}/>
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
