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
import { startCase } from "lodash";



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
                editControls: false,
                formFields :  [],
                allowEditAgain : false,
                isLoaded : false
            }

            this.originalValues = this.props.formFields
        }

            
        // --------------------------------------
        // Get Props Fields and Set them as
        // Local State
        // --------------------------------------

        componentDidMount() {


            const fields =  this.props.formFields;

            let blockEdit = localStorage.getItem('xplorITOwner') !== null ? false : true

            if(blockEdit === true) {
                if(sessionStorage.getItem('userCanEdit') === 'true') 
                    blockEdit = false
                else
                    blockEdit = true
                
            }

            this.setState({
                editControls: this.props.editFields || false,
                blockEdit : blockEdit,
                formFields : fields || [],
                oldFormFields : this.props.formFields,
                isLoaded : true
            });

            
        }



        componentWillReceiveProps(nextProps) {
            console.log("TCL: FieldsMaker -> componentWillReceiveProps -> nextProps", nextProps)

            
            console.log("TCL: FieldsMaker -> componentWillReceiveProps -> this.props", this.props)


            if(nextProps.formFields.updatePanelContent){

                const {formFields} = nextProps;


                this.setState({
                    formFields : formFields,
                    
                })


                
                console.log("TCL: PanelContent -> componentWillReceiveProps -> this.state", this.state)
            }

        }



    /* ==========================================================================
    ** Handle State
    ** ========================================================================== */

            // --------------------------------------
            // Enable Edition of Fields
            // --------------------------------------
            toggleFieldsEdit = (event) => {
                console.log("TCL: FieldsMaker -> toggleFieldsEdit -> event", event)
                event.preventDefault();
                const {target} = event
                const {innerText} = target
                let discardChanges = false;

                console.log("TCL: FieldsMaker -> toggleFieldsEdit -> this.props.formFields", this.props.formFields)

                // ? Discar Changes && Reset State
                if(event.target.name === 'cancelButton') {
                    this.setState({
                        formFields : this.originalValues
                    })
                }
                
                // ? Re enable fields edition after the data saved on the DB
                // ? Send False to indicate the user is editing the tab
                if( this.props.formFields.updatePanelContent && innerText === 'Edit Content') {
                    
                    this.setState({ editControls: true})
                    this.props.enableTabEdit(!this.state.editControls, false)
                    // this.props.enableTabEdit(false, false)
                }
                    
                
                else  {
                      // ? Normal Behavior to toggle the Edit/read of the fields
                
                    const { editControls } = this.state;
                    console.log("TCL: FieldsMaker -> toggleFieldsEdit -> editControls ",   editControls)
                    
                    this.setState({ editControls: !editControls })
                    this.props.enableTabEdit(!editControls, discardChanges)
                }



            }


            // ?--------------------------------------
            // ? Update Values to Show
            // ? @param {dataRequest} webService Request from AddProjectForm
            // ? @param {dataState} Add Project Form State
            // ?--------------------------------------

            toggleFieldsAfterUpdate = (dataRequest, dataState) => {
                
                // this.state.formFields
                console.log("TCL: FieldsMaker -> toggleFieldsAfterUpdate -> this.state.formFields", this.state.formFields)

                // this.props.updateFormValues()

                // let dataStateObj = JSON.parse(data)
                    

                this.props.updateOverViewStatus(dataState, dataRequest)

                // ? Re enable button to show the form

                this.setState({ 
                    editControls: false ,
                    allowEditAgain : true
                })

                this.props.enableTabEdit(false, false)

                

                // this.props.enableTabEdit(!editControls, discardChanges)

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
                const {formFields} = this.state;
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
               

                // Get State Index

                let currentField = formFields.filter((field , index) => {return index === parseInt(stateIndex)})[0]
                
                let newField = Object.assign({}, currentField, {
                    attrValues : value
                })

                
          

                let newFormFields = formFields.map((field, index) => {
                    if(newField.attrID === field.attrID) {
                        field = newField
                    }

                    return field
                })

                console.log("TCL: FieldsMaker -> newFormFields", newFormFields)

            
                
                
                this.setState({formFields : newFormFields});
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
                // let currentField = formFields.filter((field , index) => {return index === parseInt(stateIndex)})[0]

                let currentField = formFields.find((field, index) => {return index === parseInt(stateIndex)});

                let boolValue = null;
              

                // ?Change Value

                    if(event.target.checked ===  true) 
                        boolValue = "Y"
                    else
                        boolValue = "N"    


                        


                  
                    let newField = Object.assign({}, currentField, {
                            attrValues : boolValue
                    })
                
                // ? Udpate State
                    // formFields[stateIndex] = currentField

                    let newFormFields = formFields.map((field, index) => {
                        if(newField.attrID === field.attrID) {
                            field = newField
                        }

                        return field
                    })

                    console.log("TCL: FieldsMaker -> newFormFields", newFormFields)

                
                    
                    
                    this.setState({formFields : newFormFields});
                
                
                    // this.setState({formFields : formFields});


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

                
                // let currentField = formFields[stateIndex];

                let currentField = formFields.filter((field , index) => {return index === parseInt(stateIndex)})[0]
               

                // // Find selected Option on the Possible Values
                // // Add the new value to attrValues
                let currrentValuesArray =  currentField.attrValues.split('||');

                //? check if the action is add or remove items
                if(checked === true) {
                    if(!currrentValuesArray.includes(optionName))
                        currrentValuesArray.push(optionName);
                }
                else if(checked === false) {
                    if(currrentValuesArray.includes(optionName)){
                        currrentValuesArray = currrentValuesArray.filter(currentValue => currentValue !== optionName)
                    }
                }

            


                // //! Convert the Array to string and update State
                    // currentField.attrValues = currrentValuesArray.join('||');
                    let newField = Object.assign({}, currentField, {
                        attrValues : currrentValuesArray.join('||')
                    })


                    let newFormFields = formFields.map((field, index) => {
                        if(newField.attrID === field.attrID) {
                            field = newField
                        }

                        return field
                    })

                    this.setState({formFields : newFormFields});

                
                // console.log("TCL: FieldsMaker -> onListItemClick -> currentField.attrValues", currentField.attrValues)
                // formFields[stateIndex] = currentField;
                // this.setState({formFields : formFields});
                
            }


            // ?--------------------------------------
            // ? Set DatePicker Value
            // ?--------------------------------------
            onDateChange = (date, name , stateIndex) => {
             

                // Get Item
                // const {target} = event;
                // const {checked} = target;
                // let stateIndex = selectedItemArray[1];
                let {formFields} = this.state
                // let currentField = formFields[index];
                let currentField = formFields.filter((field , index) => {return index === parseInt(stateIndex)})[0];


                let newField = Object.assign({}, currentField, {
                    attrValues : date
                })


                let newFormFields = formFields.map((field, index) => {
                    if(newField.attrID === field.attrID) {
                        field = newField
                    }

                    return field
                })

                this.setState({formFields : newFormFields});

                
                
            }



            
            // ?--------------------------------------
            // ? Handle PeoplePicker Selction event
            // peoplePickerProductSponsor_TopSpan
            // peoplePickerProductSponsor_TopSpan_HiddenInput
            // peoplePickerProductSponsor_TopSpan_EditorInput
            // ?--------------------------------------
        
            onPeoplePickerResourceFocus = (event, index) => {
                
                const {target} = event;
                const {id} = target;


                if (id.indexOf('peoplePicker') < 0)
                    return;


                let pickerNameArray =  id.split('_TopSpan_');


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


                            let newField = Object.assign({}, formItem, {
                                attrValues : peoplePickerUserValue
                            })

                            return newField

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
        }





    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */



        // --------------------------------------
        // Choose Between Toggle Control
        // Or Label Text
        // --------------------------------------
        setTextField(attrName, attrValues, divClass, editField, index,maxlength) {
            if(maxlength === "")
            {
                maxlength ="4000"
            }
            if (attrValues === "false" || attrValues === "true")
                return <ToggleField fieldName={attrName} fieldValue={attrValues} colName={divClass} editField={editField}   />
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
                />
            )

           
        }



        // ?--------------------------------------
        // ?Set PeoplePciker Control
        // ?Or Label Text
        // ?--------------------------------------
        setTextPeoplePicker(attrName, attrValues, divClass, editField, index) {
            let userNameArray = null;
            let lastNameArray = null;
            let userName = '';

            

            try {
                userNameArray = attrValues !== "" && attrValues.indexOf('.') >=0 ? attrValues.split('.') : '';
                lastNameArray = userNameArray !== "" ? userNameArray[1].split('@') : attrValues || '';

                if(attrValues !== '' && attrValues.indexOf('.')<0)
                    userName =  attrValues
                
                else if(userNameArray !== '' && lastNameArray !== '')
                    userName =this.formatOwners(`${userNameArray[0]} ${lastNameArray[0]}`)
                else
                    userName = ''
            }
            catch (error)  {
                console.log("TCL: setTextPeoplePicker -> error", error)
                userName = ''
            }

            return (
                <FieldPicker
                    fieldName={attrName}
                    fieldValue={attrValues}
                    editField={editField}
                    inputName={attrName}
                    index ={index}
                    userName = {userName}
                    dynamicPicker = {true}
                    onFocus = {this.onPeoplePickerResourceFocus}
                    onBlur = {this.onPeoplePickerResourceFocus}
                   
                />
            )



        }

        // --------------------------------------
        // Set Format To Owner Name
        // --------------------------------------
        formatOwners = (ownerName) => {
            return startCase(ownerName.toLowerCase())
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
            
            console.log("TCL: setFieldType -> field", field)

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
                        const posibleValues = (pickListValues.split('|')).filter( posValue => posValue !== "" );
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
            
            const { editControls, formFields, allowEditAgain } = this.state;
            console.log("TCL: renderFields -> formFields", formFields)

            console.log("TCL: renderFields -> this.props", this.props)


            let editControlsValue = false
            let formFieldsData = null
            if(formFields.updatePanelContent && !allowEditAgain) {
                formFieldsData = formFields;
                editControlsValue = false
            }

            else if(formFields.updateFormValues && allowEditAgain) {
                formFieldsData = formFields;
                editControlsValue = true
            }

            else {
                formFieldsData = this.props.formFields;
                editControlsValue = editControls
            
            }


            console.log("TCL: renderFields -> formFilesData", formFieldsData)

            if (isOverview) {

                // ? Set false if the editControls Val is undefined, eg => the fist time the page loads

                if (newProject)
                    return <AddProjectForm productOverview={formFieldsData || this.props.formFields} updateProject = {false}/>;
                    // return <AddProjectForm productOverview={formFields || this.props.formFields} updateProject = {false}/>;
                else
                    return(<CardHeaderWide 
                                    // productOverview={formFields || this.props.formFields} 
                                    productOverview = {formFieldsData}
                                    editControls = {editControlsValue || false} 
                                    toggleFieldsAfterUpdate = {this.toggleFieldsAfterUpdate}
                                    toggleFields = {this.toggleFieldsEdit}
                                    
                            />);

            }


            else {
                return (
                    <form name = {`form-${tabTitle}`} style = {{width:'100%'}} onSubmit = {this.saveFields}>
                        <div className="container">
                            <div className="row">
                                <div className="xpl-editButtonContainer" style = {{marginTop:20}}>

                                    <h2> {tabTitle}  </h2>

                                {
                                    (this.state.blockEdit === false && editControls === false ) ?
                                        <SingleButton
                                            buttonText={"Edit Content"}
                                            buttonColor={"primary"}
                                            Key = {'editButton'}
                                            buttonName = {'editButton'}
                                            onClick={this.toggleFieldsEdit}
                                        />

                                    // ? Submit New Values And update DB

                                    :
                                    (this.state.blockEdit === false && editControls === true ) &&
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
                                                            
                                            <div className="xpl-buttonCenterContainer" style = {{marginTop:20}}>

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
