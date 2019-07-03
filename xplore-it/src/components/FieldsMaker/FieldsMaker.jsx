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
                // this.state = {
                //     editControls: this.props.editFields || false,
                //     formFields : this.props.formFields || [],
                //     oldFormFields : this.props.formFields,
                //     isLoaded : false
                // }

                 this.state = {
                    editControls: false,
                    formFields :  [],
                    // oldFormFields : this.props.formFields,
                    isLoaded : false
                }

                this.originalValues = this.props.formFields
                console.log("TCL: FieldsMaker -> constructor -> props ",this.props)
            }

                
            // --------------------------------------
            // Get Props Fields and Set them as
            // Local State
            // --------------------------------------

            componentDidMount() {

                console.log("TCL: FieldsMaker -> constructor -> this.originalValues", this.originalValues)

                const fields =  this.props.formFields;

                this.setState({
                    editControls: this.props.editFields || false,
                    formFields : fields || [],
                    oldFormFields : this.props.formFields,
                    isLoaded : true
                });

                
            }


            

            // componentWillReceiveProps = (nextProps) => {
                
            //     console.log("TCL: FieldsMaker -> componentWillReceiveProps -> nextProps", nextProps)
                
                
            //     console.log("TCL: FieldsMaker -> componentWillReceiveProps -> this.props", this.props)
                
            // }

        




        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */

                // --------------------------------------
                // Enable Edition of Fields
                // --------------------------------------
                toggleFieldsEdit = (event) => {
                    console.log("TCL: FieldsMaker -> toggleFieldsEdit -> event", event)
                    event.preventDefault();
                    let discardChanges = false;

                    console.log("TCL: FieldsMaker -> toggleFieldsEdit -> this.props.formFields", this.props.formFields)
                    if(event.target.name === 'cancelButton') {
                        console.log("TCL: FieldsMaker -> toggleFieldsEdit -> event.target.name", event.target.name)

                        // this.originalValues 
                        console.log("TCL: FieldsMaker -> toggleFieldsEdit -> this.originalValues ", this.originalValues )
                        // this.setState({formFields : this.originalValues });

                        discardChanges =  true

                        // this.componentDidMount()

                        // this.setState({ editControls:false})

                        // return
                    }
                        
                    
                    
                    const { editControls } = this.state;
                    console.log("TCL: FieldsMaker -> toggleFieldsEdit -> editControls ",   editControls)
                    
                    this.setState({ editControls: !editControls })
                    this.props.enableTabEdit(!editControls, discardChanges)


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
                    
                    // let newField = Object.assign({}, currentField, {
                    //     attrValues : value
                    // })

                    // let newFormFields = [];

                    currentField.attrValues =  value
                    // currentField.mutable = true

                    formFields[stateIndex] = currentField


                    // let newFormFields = Object.assign([], formFields, {stateIndex: newField});

                    // let newFormFields = [...formFields.filter((field , index) => {return index !== parseInt(stateIndex)}), newField];

                    // console.log("TCL: FieldsMaker -> newFormFields", newFormFields)
                    // formFields[stateIndex] = newField

                    // console.log("TCL: FieldsMaker -> newFormFields", newFormFields)




                    const newDataSource = formFields.reduce((ds, item, idx) =>  stateIndex !== idx
                                                    ? ds.concat(item)
                                                    : ds.concat(Object.assign({}, item, { attrValues: value })), []);

                    
                    

                    console.log("TCL: FieldsMaker -> newDataSource", newDataSource)
                    
                    
                    this.setState({formFields : newDataSource});
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


                            currentField.mutable = true
                    
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

                


                    //! Convert the Array to string and update State
                    currentField.attrValues = currrentValuesArray.join('||');
                    currentField.mutable = true
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
                    const context = this;
                    const {target} = event;
                    const {id, name} = target;


                    if (id.indexOf('peoplePicker') < 0)
                        return;


                    let pickerNameArray =  id.split('_TopSpan_');

                    // target.querySelectorAll(`${id}_HiddenInput`);

                    const pickerValue = document.getElementById(`${pickerNameArray[0]}_TopSpan_HiddenInput`).value;
                    
                    if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                        return ;

                    else {
                        // ? Get picker Value
                        let peoplePickerUserValue = (JSON.parse(pickerValue))[0].Description;

                        // ? Get Current Field
                        let {formFields} = this.state;
                        let stateNameItemArray = pickerNameArray[0].split('peoplePicker')
                        let newFormFields =  formFields.map((formItem, index) => {
                            
                            if((formItem.attrName.toLowerCase()).replace(' ', '') === stateNameItemArray[1].toLowerCase()) {

                                formItem.attrValues = peoplePickerUserValue

                                // return formItem
                            }

                            return formItem
                              
                        })
                        
                        
                     

                        this.setState({formFields : newFormFields})
                    }   
                        

                   
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
            setTextField(attrName, attrValues, divClass, editField, index,maxlength) {
                if(maxlength == "")
                {
                    maxlength="4000"
                }
                if (attrValues === "false" || attrValues === "true")
                    return <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField}  />
                else
                    return <FieldItem 
                                    fieldName={attrName} 
                                    fieldValue={attrValues} 
                                    colName={divClass} 
                                    editField={editField} 
                                    isTextArea={true}  
                                    maxLength = {maxlength}
                                    onChangeInput =  {this.onTextChange}
                                    index = {index} />
            }


            // --------------------------------------
            // Set Date Control
            // Or Label Text
            // --------------------------------------
            setDatePickerField(attrName, attrValues, divClass, editField, index) {
               

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
                    let { attrName, attrValues, datatype, pickListValues, valueID,maxlength} = field;
                    console.log("TCL: FieldsMaker -> setFieldType -> field ",field);
                    let divClass = `col-xl-${colClass} col-lg-${colClass} col-sm-12 col-xs-12`;
                    let formField = null;
                    switch ((datatype.toLowerCase())) {

                        //? Text Input Field
                        case "string":
                            formField = this.setTextField(attrName, attrValues, divClass, editField, index,maxlength);
                            break;

                        //? CheckboxList
                        case "picklist":

                            //? Split The Values to Create a List
                            const valuesArray = attrValues.split('||');
                            const posibleValues = pickListValues.split('|');
                            const valuesDataArray = valueID.split('||');
                            valuesArray.length > 0
                                ? formField = this.setListField(attrName , valuesArray, posibleValues , divClass, editField, valuesDataArray, index)
                                : formField = this.setTextField(attrName, attrValues, divClass, editField, index,maxlength);

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
                            formField = this.setTextField(attrName, attrValues, divClass, editField, index,maxlength);

                    }

                    return formField
                }

                catch (error) {
                    console.log("TCL: FieldsMaker -> setFieldType -> error", error)
                    throw new Error({ 'error': error });
                }
            }


            // ?--------------------------------------
            // ? Render Fields
            // ? Check if the view is for Overview Tab
            // ? And if is for update or New projecyt
            // ?--------------------------------------        
            renderFields() {
                const { isOverview,  tabTitle, newProject } = this.props;
                const { editControls, formFields } = this.state;

                if (isOverview) {

                    // ? Set false if the editControls Val is undefined, eg => the fist time the page loads

                    if (newProject)
                        return <AddProjectForm productOverview={formFields || this.props.formFields} updateProject = {false} />;
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
                                                Key = {'editButton'}
                                                buttonName = {'editButton'}
                                                onClick={this.toggleFieldsEdit}
                                            />

                                        // ? Submit New Values And update DB

                                        :
                                            <SingleButton
                                                buttonText={"Cancel"}
                                                buttonColor={"primary"}
                                                Key = {'cancelButton'}
                                                buttonName = {'cancelButton'}
                                                onClick={this.toggleFieldsEdit}
                                            />
                                        //    <input type="submit" value="Save Content" className = 'xpl-singleButton' name = {'saveContent'}/>
                                    }
                                    </div>
                                </div>

                                <div className="row" style={{ height: '100%' }}>
                                    
                                        {
                                            formFields.map((tabItem, index) => {
                                                if(tabItem.attrName.indexOf("Product Image Icon")<0)
                                                {
                                                let { attrValues, datatype } = tabItem;
                                                let valuesLength = attrValues.length;
                                                let colNum = valuesLength >= 200 ? 12 : 6;

                                                if(datatype.toLowerCase() === 'picklist')
                                                    colNum = 6
                                                return (
                                                    this.setFieldType(tabItem, colNum, editControls, index)
                                                )
                                                }
                                            })
                                        }
                                        {
                                            editControls === true
                                            ?  
                                                                
                                                <div className="xpl-buttonCenterContainer">

                                                    <input type="submit" value="Save Content" className = 'xpl-singleButton' name = {'saveContent'}/>
                                                    
                                                </div>
                                            :
                                                null
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
