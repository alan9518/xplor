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

            // --------------------------------------
            // Get Props Fields and Set them as
            // Local State
            // --------------------------------------

            componentDidMount() {

                this.setState({
                    formFields : this.props.formFields,
                    isLoaded : true
                });

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
                // ? Use moment js to format Date Object
                // ?--------------------------------------

                formatDate = (dateToFormat) => {
                    console.log("TCL: FieldsMaker -> formatDate ->  ", moment(dateToFormat).format("DD/MM/YYYY")  )
                    return  moment(dateToFormat).format("DD/MM/YYYY")  
                    
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
                    const {target} = event;

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


                // ?--------------------------------------
                // ? List Item Click
                // ?--------------------------------------
                onListItemClick = (event) => {
                    const {target} = event;
                    const {checked} = target;
                    let selectedItemArray  = target.id.split('-')
                    let optionName = selectedItemArray[0];
                    let stateIndex = selectedItemArray[1];
                    
                    // const { value } = target;
                    let {formFields} = this.state

                    
                    let currentField = formFields[stateIndex];
                   

                    // Find selected Option on the Possible Values
                    // Add the new value to attrValues
                    let currrentValuesArray =  currentField.attrValues.split('||');

                    // check if the action is add or remove items
                    if(checked === true) {
                        if(!currrentValuesArray.includes(optionName))
                            currrentValuesArray.push(optionName);
                    }
                    else if(checked === false) {
                        if(currrentValuesArray.includes(optionName)){
                            currrentValuesArray = currrentValuesArray.filter(currentValue => currentValue !== optionName)
                        }
                    }

                   
                        



                    // Convert the Array to string and update State
                    currentField.attrValues = currrentValuesArray.join('||');
                    console.log("TCL: FieldsMaker -> onListItemClick -> currentField.attrValues", currentField.attrValues)
                    formFields[stateIndex] = currentField;
                    this.setState({formFields : formFields});
                    
                }


                // ?--------------------------------------
                // ? Set DatePicker Value
                // ?--------------------------------------
                onDateChange = (date, name , index) => {
                 

                    // Get Item
                    // const {target} = event;
                    // const {checked} = target;
                    let {formFields} = this.state
                    let currentField = formFields[index];

                    // currentField.attrValues = this.formatDate(date);
                    currentField.attrValues =  date;
                    formFields[index] = currentField
                    
                    
                    this.setState({formFields : formFields});
                    
                    
                }



                
                // ?--------------------------------------
                // ? Handle PeoplePicker Selction event
                // peoplePickerProductSponsor_TopSpan
                // peoplePickerProductSponsor_TopSpan_HiddenInput
                // peoplePickerProductSponsor_TopSpan_EditorInput
                // ?--------------------------------------
            
                onPeoplePickerResourceFocus = (event, index) => {
                    console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> event", event)
                    const context = this;
                    const {target} = event;
                    const {id, name} = target;
                    console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> name", name)


                    if (id.indexOf('peoplePicker') < 0)
                        return;



                    console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> target", target)
                    console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> id", id)

                    let pickerNameArray =  id.split('_TopSpan_');
                    console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> pickerNameArray", pickerNameArray)

                    // target.querySelectorAll(`${id}_HiddenInput`);

                    const pickerValue = document.getElementById(`${pickerNameArray[0]}_TopSpan_HiddenInput`).value;
                    
                    if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                        return ;

                    else {
                        // ? Get picker Value
                        let peoplePickerUserValue = (JSON.parse(pickerValue))[0].Description;

                        // ? Get Current Field
                        let {formFields} = this.state;
                        // const pickerContainer = document.getElementById(`${pickerNameArray[0]}_TopSpan_HiddenInput`).value;
                        let stateNameItemArray = pickerNameArray[0].split('peoplePicker')
                        console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> stateNameItemArray", stateNameItemArray)
                        // let currentField = formFields.filter((formItem) => {formItem.attrName.toLowerCase().replace(' ', '') === stateNameItemArray[0].toLowerCase()} )

                        // let currentField =  formFields.filter((formItem, index) => {
                            
                        //     console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> formItem", formItem)

                        //     console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> formItem.attrName.toLowerCase()", formItem.attrName.toLowerCase())
                            
                        //     if((formItem.attrName.toLowerCase()).replace(' ', '') === stateNameItemArray[1].toLowerCase()) {
                        //         console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> index", index)
                                
                        //         return formItem
                        //     }
                              
                        // })[0]



                        let newFormFields =  formFields.map((formItem, index) => {
                            
                            console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> formItem", formItem)

                            console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> formItem.attrName.toLowerCase()", formItem.attrName.toLowerCase())
                            
                            if((formItem.attrName.toLowerCase()).replace(' ', '') === stateNameItemArray[1].toLowerCase()) {
                                console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> index", index)

                                formItem.attrValues = peoplePickerUserValue

                                // return formItem
                            }

                            return formItem
                              
                        })
                        console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> newFormFields", newFormFields)
                        
                        
                        // console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> currentField", currentField)


                        // console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> peoplePickerUserValue", peoplePickerUserValue)
                        // console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus -> pickerValue", pickerValue)


                        // currentField.attrValues = peoplePickerUserValue;



                        this.setState({formFields : newFormFields})
                    }   
                        

                    // if(this.getPeoplePickerData(`${id}_HiddenInput`))

                    // if (target.className === 'ms-core-menu-sublabel ms-metadata' || target.className === 'ms-core-menu-label') {
                        
                        
                    //     // let owner = context.getPeoplePickerData('peoplePickerOwner_TopSpan_HiddenInput');
                    //     // let pickerInput =  target.querySelectorAll(`${id}_HiddenInput`);
                    //     console.log("TCL: FieldsMaker -> onPeoplePickerResourceFocus ->  owner",  owner)
                    //     // context.setState({
                    //     //     owner: owner
                    //     // })

                    //     // console.log('owner', context.state.owner)

                    // }

                    // else
                    //     return;

                }



                
            // ?--------------------------------------
            // ? Get Data From People Picker
            // ?--------------------------------------
            getPeoplePickerData(peoplePicker) {
                let pickerValue = JSON.parse(document.getElementById(peoplePicker).value);
                if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                    return null;
                else
                {
                    const picker = JSON.parse(pickerValue) || {};
                    return picker[0].Description;
                }
                // return picker[0];   
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
            setDatePickerField(attrName, attrValues, divClass, editField, index) {
                console.log("TCL: FieldsMaker -> setDatePickerField -> attrValues", attrValues)
               

                return (
                    <FieldDate
                        name={attrName}
                        colName={divClass}
                        fieldName = {attrName}
                        onDateChange = {this.onDateChange}
                        inputValue = {attrValues}
                        editField={editField}
                        index = {index}
                        // tabIndex = {Sequence}
                    />
                )

               
            }



            // ?--------------------------------------
            // ?Set PeoplePciker Control
            // ?Or Label Text
            // ?--------------------------------------
            setTextPeoplePicker(attrName, attrValues, divClass, editField, index) {
                console.log("TCL: FieldsMaker -> setTextPeoplePicker -> attrName", attrName)


                

                
                return (
                    <FieldPicker
                        fieldName={attrName}
                        fieldValue={attrValues}
                        editField={editField}
                        inputName={attrName}
                        index ={index}
                        dynamicPicker = {true}
                        onFocus = {this.onPeoplePickerResourceFocus}
                        onBlur = {this.onPeoplePickerResourceFocus}
                       
                    />
                )



            }


            // ?--------------------------------------
            // ? Create Picklist Control
            // ?--------------------------------------
            setListField(attrName , valuesArray, posibleValues , divClass, editField,valuesDataArray, index) {
                console.log("TCL: FieldsMaker -> setListField -> divClass", divClass)
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
                            onClick = {this.onListItemClick}
                            index = {index}
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
                            valuesArray.length > 0
                                ? formField = this.setListField(attrName , valuesArray, posibleValues , divClass, editField, valuesDataArray, index)
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
                            formField = this.setTextPeoplePicker(attrName, attrValues, divClass, editField, true, index);
                            break;

                        //? DatePicker
                        case "date":
                            formField = this.setDatePickerField(attrName, attrValues, divClass, editField, index);
                            break;

                        //? Text Input Field
                        default:
                            formField = this.setTextField(attrName, attrValues, divClass, editField, index);

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

                    // Set false if the editControls Val is undefined, eg => the fist time the page loads

                    if (newProject)
                        return <AddProjectForm productOverview={formFields || this.props.formFields} />;
                    else
                        return(<CardHeaderWide 
                                        productOverview={formFields || this.props.formFields} 
                                        editControls = {editControls || false} 
                                        toggleFields = {this.toggleFieldsEdit}
                                />);

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
                                                let { attrValues, datatype } = tabItem;
                                                let valuesLength = attrValues.length;
                                                let colNum = valuesLength >= 200 ? 12 : 6;

                                                if(datatype.toLowerCase() === 'picklist')
                                                    colNum = 6
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
