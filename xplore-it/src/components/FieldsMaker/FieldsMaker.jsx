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
    import { ToggleField, FieldItem, FieldList, CardHeaderWide, SingleButton, FieldDate, FieldPicker, AddProjectForm, CustomPicker } from '../../components'
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
                    formFields : [],
                    isLoaded : false
                }
                // this.parentTabHeight = document.getElementsByClassName('rc-tabs-tabpane-active')[0].clientHeight
            }


            componentDidMount() {

                
                setTimeout(() => {
                        
                    // window.initializePeoplePicker('peoplePickerDomainOwners', '175px', 19);
                    // window.initializePeoplePicker('peoplePickerProductSponsor', '175px', 31);


                    // window.initializePeoplePicker('peoplePickerDomainOwners', '175px', 19);
                    // let picker = document.getElementById('peoplePickerDomainOwners')
                    // let pickerContainer = document.getElementById('DomainOwners-container')
                    // console.log("TCL: FieldsMaker -> toggleFieldsEdit -> pickerContainer", pickerContainer)
                    // console.log("TCL: FieldsMaker -> toggleFieldsEdit -> picker", picker)
    
                    // this.fillPickers();


                    this.setState({
                        formFields : this.props.formFields,
                        isLoaded : true
                    });
                
                    
                }, 0);


             
             

              
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
                    // window.initializePeoplePicker('peoplePickerBusiness', '175px', 19);
                    // window.initializePeoplePicker('peoplePickerProductSponsor', '175px', 19);
                    // peoplePickerProductSponsor
                    this.props.enableTabEdit(!editControls)


                }


                // ?--------------------------------------
                // ? Save New Data
                // ?--------------------------------------
                saveFields = (event)=> {
                    event.preventDefault();
                    console.log("TCL: FieldsMaker -> saveFields -> event", event)
                    

                    const {target} = event;
                    const {formFields} = this.state;
                    console.log("TCL: FieldsMaker -> saveFields -> formFields", formFields)
                    

                    // get form Data
                    


                    this.setState({ editControls: false })
                    this.props.enableTabEdit(false)


                    this.props.updateFormValues(formFields)
                }



                // ?--------------------------------------
                // ? Merge Selected Values && Possible
                // ? Values in One List
                // ?--------------------------------------
                setCheckboxList(selectedItems, posibleValues) {

                    let origLength = posibleValues.length;
                    let updatingLength = selectedItems.length;
                    let checkList = posibleValues;

                    //Traverse the original array and replace only if the second array also has the same value
                    for(let i = origLength-1; i >= 0; i--) {
                        for(let j = updatingLength -1; j >= 0; j--) {
                            if(checkList[i].name === selectedItems[j].name) {
                                checkList[i] = selectedItems[j];
                            }
                        }
                    }

                    return checkList
                }



                // ?--------------------------------------
                // ? On change Input Text
                // ?--------------------------------------
                onTextChange = (name , value, index)=> {
                   
                    let {formFields} = this.state
                    let stateIndex = index.split('-')[1]
                    let currentField = this.state.formFields[stateIndex];
                    

                    currentField.attrValues =  value
                    

                    formFields[stateIndex] = currentField
                    
                    
                    this.setState({formFields : formFields});
                }


                // ?--------------------------------------
                // ? On Toggle Component Change
                // ? Since the values come as N and Y
                // ? Bind string to Bool values
                // ?--------------------------------------
                onToggleChange = (event) => {
                    console.log("TCL: FieldsMaker -> onToggleChange -> event", event)
                    const {target} = event;
                    console.log("TCL: FieldsMaker -> onToggleChange -> target", target)

                    // target.id
                    console.log("TCL: FieldsMaker -> onToggleChange -> target.id", target.id)
                    console.log("TCL: FieldsMaker -> onToggleChange -> target.name", target.name)

                    // event.target.checked
                    console.log("TCL: FieldsMaker -> onToggleChange -> event.target.checked", event.target.checked)


                    let {formFields} = this.state
                    let stateIndex = target.id.split('-')[1]
                    let currentField = formFields[stateIndex];
                    console.log("TCL: FieldsMaker -> onToggleChange -> currentField", currentField)

                    // ?Change Value
                        if(event.target.checked ===  true)
                            currentField.attrValues = "Y"
                        else
                            currentField.attrValues = "N"    

                    
                    // ? Udpate State
                        formFields[stateIndex] = currentField
                    
                    
                        this.setState({formFields : formFields});


                }   




        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */



            // --------------------------------------
            // Choose Between Toggle Control
            // Or Label Text
            // --------------------------------------
            setTextField(attrName, attrValues, divClass, editField, index) {
                if (attrValues === "false" || attrValues === "true")
                    return <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField}  />
                else
                    return <FieldItem 
                                    fieldName={attrName} 
                                    fieldValue={attrValues} 
                                    colName={divClass} 
                                    editField={editField} 
                                    isTextArea={true}  
                                    onChangeInput =  {this.onTextChange}
                                    index = {index} />
            }


            // --------------------------------------
            // Set Date Control
            // Or Label Text
            // --------------------------------------
            setDatePickerField(attrName, attrValues, divClass, editField) {
                console.log("TCL: FieldsMaker -> setDatePickerField -> attrValues", attrValues)
               

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



            // ?--------------------------------------
            // ?Set PeoplePciker Control
            // ?Or Label Text
            // ?--------------------------------------
            setTextPeoplePicker(attrName, attrValues, divClass, editField, dynamicPicker) {
                console.log("TCL: FieldsMaker -> setTextPeoplePicker -> attrName", attrName)


                

                
                return (
                    <FieldPicker
                        fieldName={attrName}
                        
                        fieldValue={attrValues}
                        editField={editField}
                        inputName={attrName}
                        // inputName ={'Owner'}
                        dynamicPicker = {dynamicPicker}
                        // colName={'col-md-12 col-lg-12'}
                    // onPickerChange = {this.onChangeInput}
                    />
                )



                // return (    
                //     <FieldPicker 
                //         fieldName={attrName}
                //         fieldValue = {attrValues} 
                //         editField = {true} 
                //         inputName = {"Owner"}
                //         colName = {'col-md-12 col-lg-12'}
                //         // onPickerChange = {this.onChangeInput}
                //         dynamicPicker = {false}
                //     />
                // )

            }


            // ?--------------------------------------
            // ? Create Picklist Control
            // ?--------------------------------------
            setListField(attrName , valuesArray, posibleValues , divClass, editField,valuesDataArray) {
                // Merge values names list and values names array
            
                    const selectedItems  = valuesArray.map((item, index) => {
                        let itemObject = {
                            name : item,
                            value : valuesDataArray[index],
                            isChecked : true
                        }

                        return itemObject
                    })

                // format All Possible Values
                    const unSelectedItems = posibleValues.map((item) => {
                        let itemObject = {
                            name : item,
                            value : 0,
                            isChecked : false
                        }

                        return itemObject
                    });


                let CheckboxList = this.setCheckboxList(selectedItems, unSelectedItems)
                    
                return <FieldList 
                    fieldName={attrName} 
                    listValues={CheckboxList} 
                    posibleValues = {unSelectedItems} 
                    colName={divClass} 
                    editField={editField} 
                /> 
            }


            // ?--------------------------------------
            // ? Create Toggle Control
            // ?--------------------------------------
            setToggleField(attrName, attrValues, divClass, editField, index) {
                return (
                    <ToggleField 
                            fieldName={attrName} 
                            fieldValue={attrValues} 
                            colName={divClass} 
                            editField={editField} 
                            onChange = {this.onToggleChange}
                            index  = {index}
                    />
                )
            }




            // --------------------------------------
            // Set Field Type
            // Set Number of Columns
            // --------------------------------------   
            setFieldType(field, colClass, editField, index) {

                try {
                    let { attrName, attrValues, datatype, pickListValues, valueID } = field;
                    let divClass = `col-xl-${colClass} col-lg-${colClass} col-sm-12 col-xs-12`;
                    let formField = null;
                    switch ((datatype.toLowerCase())) {

                        //? Text Input Field
                        case "string":
                            formField = this.setTextField(attrName, attrValues, divClass, editField, index);
                            break;

                        //? CheckboxList
                        case "picklist":

                            //? Split The Values to Create a List
                            const valuesArray = attrValues.split('||');
                            const posibleValues = pickListValues.split('|');
                            const valuesDataArray = valueID.split('||');
                            valuesArray.length > 1
                                ? formField = this.setListField(attrName , valuesArray, posibleValues , divClass, editField, valuesDataArray)
                                : formField = this.setTextField(attrName, attrValues, divClass, editField, index);

                            break;

                        // Toggle
                        case "boolean":
                            formField = this.setToggleField(attrName, attrValues, divClass, editField, index);
                            break;

                        //? Sharepoint PeoplePicker
                        case "peoplepicker":
                            formField = this.setTextPeoplePicker(attrName, attrValues, divClass, editField);
                            break;

                        //? Sharepoint PeoplePicker
                        case "person":
                            formField = this.setTextPeoplePicker(attrName, attrValues, divClass, editField, true);
                            break;

                        //? DatePicker
                        case "date":
                            formField = this.setDatePickerField(attrName, attrValues, divClass, editField);
                            break;

                        //? Text Input Field
                        default:
                            formField = this.setTextField(attrName, attrValues, divClass, editField, index);
                            // formField = <FieldItem 
                            //                 fieldName={attrName} 
                            //                 fieldValue={attrValues} 
                            //                 colName={divClass} 
                            //                 editField={editField} 
                            //                 onChangeInput =  {this.onTextChange}
                            //                 useParentState = {true} />

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
                const { isOverview,  tabTitle, newProject } = this.props;
                const { editControls, formFields } = this.state;

                if (isOverview) {

                    if (newProject)
                        return <AddProjectForm productOverview={formFields || this.props.formFields} />;
                    else
                        return <CardHeaderWide productOverview={formFields || this.props.formFields} />;

                }


                else {
                    return (
                        <form name = {`form-${tabTitle}`} style = {{width:'100%'}} onSubmit = {this.saveFields}>
                            <div className="container">
                                <div className="row">
                                    <div className="xpl-editButtonContainer">

                                        <h2> {tabTitle}  </h2>

                                    {
                                        editControls === false ?
                                            <SingleButton
                                                buttonText={"Edit Content"}
                                                buttonColor={"primary"}
                                                onClick={this.toggleFieldsEdit}
                                            />

                                            // <SingleButton
                                            //     buttonText={"Save Content" }
                                            //     buttonColor={"primary"}
                                            //     onClick={this.saveFields}
                                            // />

                                        :

                                           <input type="submit" value="Save Content" className = 'xpl-singleButton' name = {'saveContent'}/>
                                    }
                                    </div>
                                </div>

                                <div className="row" style={{ height: '100%' }}>
                                    
                                        {
                                            formFields.map((tabItem, index) => {
                                                let { attrValues } = tabItem;
                                                let valuesLength = attrValues.length;
                                                let colNum = valuesLength >= 200 ? 12 : 6;
                                                return (
                                                    this.setFieldType(tabItem, colNum, editControls, index)
                                                )
                                            })
                                        }
                                
                                </div>

                            </div>
                        </form>
                    )
                }

        }




        // --------------------------------------
        // Render Component
        // --------------------------------------   

        render() {
            const { isLoaded } = this.state;
            return isLoaded === true  && this.renderFields()
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
