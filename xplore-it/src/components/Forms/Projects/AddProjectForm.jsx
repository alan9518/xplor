/* ==========================================================================
** Add New Project 
** Overview Form Content
** 03/05/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React , {Component, Fragment} from "react";
    import PropTypes from "prop-types";
    import {  FieldPicker, FieldDate, FieldItem,  EditableProjectCard, FieldSelect, FieldIcon, SingleButton, FieldRemovableList  } from "../../../components";
    import {Endpoints} from '../../../services/endpoints';
    import axios from 'axios';
    import moment from 'moment';
    
    


// --------------------------------------
// Create Component Class
// --------------------------------------
    class AddProjectForm extends Component {


        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */


            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: false,
                    projectName : '',
                    softwareTopic : {label : 'Select a Software Topic', value : ''},
                    softwareTopicName : '',
                    softwareTopicValues : [],
                    vendorValues : [],
                    vendor : {},
                    subCapabilitesValues : [],
                    subCapability : {label : 'Select a SubCapability', value : ''},
                    owner : '', 
                    createdDate : moment().format("MM/DD/YYYY") , 
                    lastUpdateDate : moment().format("MM/DD/YYYY"), 
                    coOwner : '', 
                    shortDescription : '',
                    cardColor : null,
                    cardIcon :  '',
                    showColorPicker : false,
                    currentVendorID : 0,
                    proCategories : [],
                    proCategory : {label : 'Select a proCategory', value : ''},
                    keywords : [],
                    productKeyword : '',
                    keywordsList : [], 

                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onSoftTopicsSelectChage =  this.onSoftTopicsSelectChage.bind(this);
                // this.masterUsers = [];
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                const pickersWidth = '175px';
                this.loadAPI();
                // this.initPickers()
                setTimeout(() => {
                    
                        
                    window.initializePeoplePicker('peoplePickerOwner', pickersWidth, 19);
                    window.initializePeoplePicker('peoplePickerCoOwner', pickersWidth, 31);
                  
                    
                }, 0);
            }


            // --------------------------------------
            // Handle all Requests
            // --------------------------------------

            async loadAPI() {
                try {
                    // Get API Routes
                    const apiRoutesPromise = this.loadAPICategories();
                    // Get SP Routes
                    const SPRoutesPromise =  this.loadSPCategories();

                    // Get ProCategories
                    const proCategoriesPromise = this.loadProCategories();

                    // Resolve Both Promises
                    const [apiRoutes, SPRoutes, proCategoriesData] = await Promise.all([apiRoutesPromise,SPRoutesPromise, proCategoriesPromise]);
                    // const [apiRoutes, SPRoutes] = await Promise.all([apiRoutesPromise,SPRoutesPromise]);
					
                    
                    // Get Routes Values
                    const apiRoutesData =  apiRoutes.data;
                   

                    // Prepare SP Routes
                    const SPRoutesData = this.createSPArray(SPRoutes.data.value);


                    const softwareTopicValues = this.mergeCat(apiRoutesData, SPRoutesData)
					

                    

                    this.setState({
                        // categories : appRoutes || [],
                        isLoaded : true,
                        softwareTopicValues : softwareTopicValues,
                        proCategories : this.createOptionsProCat(proCategoriesData.data),
                        // vendorValues : this.createOptionsVendors(vendorsData.data),
                        showError : false,
                    })
                

                }
                catch(error) {
                    console.log('​Dashboard -> catch -> error', error)
                    this.setState({isLoaded : true, showError : true})
                }
            }



        /* ==========================================================================
        ** LOAD API
        ** ========================================================================== */



            // --------------------------------------
            // Load WebService Categories
            // --------------------------------------
            async loadAPICategories() {
                const params = {Bussmodel: 'XPLOR'}
                return axios.get(Endpoints.getAllCategories, {params});
            }   



            
            // --------------------------------------
            // Load WebService Categories
            // 13 as default Value
            // --------------------------------------
            async loadVendors(ERPCompanyID = '13') {
                // const {ERPCompanyID} = this.state;
				console.log("TCL: loadVendors -> ERPCompanyID", ERPCompanyID)
                const params = {erpid: ERPCompanyID.toString()}
                return axios.get(Endpoints.getVendors, {params});
            }   


            // --------------------------------------
            // Load SP Categories
            // --------------------------------------
            async loadSPCategories() {
                return axios.get(Endpoints.getSideBarCategoriesSP);
            }


            // --------------------------------------
            // Load WebService Categories
            // --------------------------------------
            async loadProCategories() {
                const params = {Bussmodel: 'XPLOR'}
                return axios.get(Endpoints.getProCategories, {params});
            }


            // --------------------------------------
            // Create An Array with The SP Categories
            // --------------------------------------
            createSPArray(SPCategories) {
                const SPCatsArray = (SPCategories.map((SpCat)=> {
                    return {
                        color : SpCat.Color,
                        name : SpCat.Title,
                        
                    }
                }));


        
                return (SPCatsArray);
            }





          
            /** --------------------------------------
            // Combine Routes Arrays
            // @param {APIRoutes <Array>}
            // @param {SPRoutes <Array>}
            // --------------------------------------*/
            mergeCat(APIRoutes, SPRoutes) {

            
                try {
                    const softwareTopicValues = APIRoutes.map((apiRoute) => {
                    

                        let selectOption = {};

                        for(let SPRoute of SPRoutes) {
                            if(apiRoute.CustomerName === SPRoute.name) {
                                selectOption.label = apiRoute.CustomerName;
                                selectOption.value = `${SPRoute.color}-${apiRoute.CustomerName}`
                                selectOption.CustomerID = apiRoute.CustomerID;
                                selectOption.subCap = apiRoute.SubCap || []
                                selectOption.color = SPRoute.color
                                selectOption.ERPCompanyID = apiRoute.ERPCompanyID
                            }
                        }

                        return selectOption;

                    });

                    console.log("TCL: AddProjectForm -> mergeCat -> softwareTopicValues", softwareTopicValues)

                    // Return All Routes, On an Array Merging The HomeRoute
                    // const sideBarRoutes = [homeRoute, addProjectRoute, ...appRoutes ];
                    // return sideBarRoutes;

                    return softwareTopicValues;

                }
                catch(error) {
                    // const appRoutes = [];
                    this.setState({isLoaded : true, showError : true})

                    // Return The Array with Only the HomeRoute
                    // return [...homeRoute];
                }

            }




            // ?--------------------------------------
            // ! Create New Project
            // ?{
            // /?    "productName":"Xplore IT New Pro3",
            // /?    "vendorMfdID":1227, (From getMaufacturer web service) 
            // /?    "mpnDescription":"Xplore IT New Pro3 is a new Product",
            // /?    "bussModel":"XPLOR",
            // ?    "erpCompanyID":11, (From getCustomer web service)
            // ?    "customerID":1014, (From getCustomer web service)
            // ?    "proCategoryID":3228, (From getProCategory web service)
            // /?    "ownerID":4033, (From getUsers web service)
            // /?    "delegateID":4033, (From getUsers web service)
            // /?    "userID":"JOSE.VAZQUEZ2@FLEX.COM"
            // ?}
        
            // ?--------------------------------------
            saveProject = async () => {
                const formData =  new FormData();
                const userDetails = window.getCurrentSPUser();
				
                    formData.append('productName' , this.state.projectName);
                    formData.append('vendorMfdID' , this.state.vendor.value);
                    formData.append('mpnDescription' , this.state.shortDescription);
                    formData.append('bussModel' ,'XPLOR');
                    formData.append('erpCompanyID' , this.state.softwareTopic.ERPCompanyID);
                    formData.append('customerID' , this.state.softwareTopic.CustomerID);
                    formData.append('proCategoryID' , this.state.softwareTopic);
                    formData.append('ownerID' , this.getPeoplePickerData('Owner'));
                    formData.append('delegateID' , this.getPeoplePickerData('CoOwner'));
                    formData.append('searchKeywords', this.formatSearchKeywords());
                    formData.append('userID' , userDetails.user_email);


                console.log("TCL: saveProject -> formData", formData)

            }




            // --------------------------------------
            // Format Search Keywords
            // --------------------------------------
            formatSearchKeywords() {
                const {keywordsList} = this.state;
                let keywordsListString = keywordsList.join();
                console.log("TCL: formatSearchKeywords -> keywordsListString", keywordsListString)

                return keywordsListString;
            }


        /* ==========================================================================
        ** SP Functions
        ** ========================================================================== */    

            // ?--------------------------------------
            // ? Init People Pickers
            // ?--------------------------------------
            initPickers(){
                const pickersWidth = '175px';
                window.initializePeoplePicker('peoplePickerOwner', pickersWidth, 19);
                window.initializePeoplePicker('peoplePickerCoOwner', pickersWidth, 31);
            }



            // ?--------------------------------------
            // ? Get Data From People Picker
            // ? peoplePickerBusiness_lead_TopSpan_HiddenInput
            // ?--------------------------------------
            getPeoplePickerData(peoplePicker) {
                const pickerName = `peoplePicker${peoplePicker}_TopSpan_HiddenInput`
                const pickerValue = document.getElementById(pickerName).value;
                if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                    return null;
                else
                {
                    const picker = JSON.parse(pickerValue) || {};
                    return picker[0].Description;
                }
                
				
                // const picker = JSON.parse(document.getElementById(pickerName).value);
                
            }
    
        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // !--------------------------------------
            // ! Color Picker Component Not Used
            // ! Set Card Color
            // !--------------------------------------
                onColorChange = (colorCode)=> {
                    this.setState({
                        cardColor : colorCode
                    })
                }


            // ?--------------------------------------
            // ? On InputChage
            // ?--------------------------------------
                onInputChage = (name, value, id)=> {

                    console.log("TCL: onInputChage -> id", id)
                    console.log("TCL: onInputChage -> value", value)
                    console.log("TCL: onInputChage -> name", name)
                // console.log("TCL: onInputChage -> event", event)
					
                    this.setState({
                        [name]: value
                    })
                }



            // ?--------------------------------------
            // ? On Product Keywords Inoput Change
            // ?--------------------------------------
                handleKeyPressAddProductKeyword = (event) => {
                    
                    if (event.key === 'Enter') { 

                        event.preventDefault();
                        
                       
                        
                        const {productKeyword, keywordsList} = this.state;

                        // ? Exit if new input is empty
                        if(productKeyword.length <= 0 || productKeyword === '')
                            return
                        

                        // ? Check the Word is not Repeated, if false then add New Word
                        if(!keywordsList.includes(productKeyword)) {

                            // add Item to Array
                            let newSearchKeywords = [...keywordsList, productKeyword.toLowerCase()];
                            
                            this.setState({
                                keywordsList : [...newSearchKeywords],
                                productKeyword : ''
                            })
                        }

                      
                    }
                  
                }


            // ?--------------------------------------
            // ? On SelectChange
            // ?--------------------------------------
                onChangeSelect(control, selectedOption) {
                    console.log("TCL: AddProjectForm -> onChangeSelect -> selectedOption", selectedOption)
                    console.log("TCL: AddProjectForm -> onChangeSelect -> control", control);

                    this.setState({
                      [control] : selectedOption
                    })   
                  
                    

                }



            
            // ?--------------------------------------
            // ? On Software Topic Change
            // ?--------------------------------------
            onSoftTopicsSelectChage = (event, selectedOption)=> {
				console.log("TCL: AddProjectForm -> onSoftTopicsSelectChage -> selectedOption", selectedOption)
                console.log("TCL: AddProjectForm -> onSoftTopicsSelectChage -> event", event)
                const {label, value, subCap, color, ERPCompanyID}  = selectedOption;
                // Get Category Name
                let valueArray =  value.split('-');
                let colorValue =  valueArray[0];
                let softValue = valueArray[1];


                // Set SubCap and ID for Vendors Request
                if(subCap.length > 0) {
                    this.setState({
                        softwareTopic: selectedOption,
                        softwareTopicName : label,
                        cardColor : color,
                        subCapabilitesValues : subCap,
                        subCapability : {},
                        ERPCompanyID : ERPCompanyID
                        // selectedSoftwareTopic
                    })
                }
                else 
                    this.setState({
                        softwareTopic: selectedOption,
                        softwareTopicName : label,
                        cardColor : color   ,
                        subCapabilitesValues : [],
                        subCapability : {},
                        ERPCompanyID : ERPCompanyID
                        // selectedSoftwareTopic
                    })


                // GET Vendors
                if ( this.state.currentVendorID !== ERPCompanyID) {
                    this.loadVendors(ERPCompanyID)
                        .then((vendorsData)=> {

                            this.setState({
                                vendorValues : this.createOptionsVendors(vendorsData.data)
                            })
                        })
                }
                   


                   
            }



            // ?--------------------------------------
            // ? Create Select Options
            // ?--------------------------------------
            createOptions (values) {
                if(values.length <= 0) 
                    return [];

                let selectValues = values && values.map((value) => {
                    if(value.SubCapabilities !== '') {
							
                        let selectValue = {};
                        selectValue.label = value.SubCapabilities
                        selectValue.value = value.SubCapabilities

    
                        return selectValue;
                    }
                
                }).filter((item)=> {return item !== undefined})



                return selectValues;
					
            }



            // ?--------------------------------------
            // ? Create Select Options Vendors
            // ?--------------------------------------
            createOptionsVendors (values) {
                if(values.length <= 0) 
                    return [];

                let selectValues = values && values.map((value) => {
                    if(value.SubCapabilities !== '') {
                        console.log("TCL: AddProjectForm -> createOptionsVendors -> value", value)
                        let selectValue = {};
                        selectValue.label = value.ManufacturerName
                        selectValue.value = value.ManufacturerId

                        return selectValue;
                    }
                
                }).filter((item)=> {return item !== undefined})



                return selectValues;

            }


            // ?--------------------------------------
            // ? Create Select Options ProCategories
            // ?--------------------------------------
            createOptionsProCat (values) {
                if(values.length <= 0) 
                    return [];


                let selectValues = values && values.map((value) => {
                        
                    let selectValue = {};

                        selectValue.label = value.Name;
                        selectValue.value = value.PartCategoryID;
                        selectValue.CategoryCode = value.CategoryCode;

                    return selectValue;
                   
                
                }).filter((item)=> {return item !== undefined})



                return selectValues;
            }


            // ?--------------------------------------
            // ? Remove Word From Search Keywords
            // ?--------------------------------------
                removeSearchKeyword = (event)=> {
                    
                    const {keywordsList} = this.state;
                    const newSearchKeywords = keywordsList.filter((word )=>{return  word !== event})
                    

                    this.setState({
                        keywordsList : newSearchKeywords
                    })
                    
                }

            // ?--------------------------------------
            // ? On IconChage
            // ?--------------------------------------
            onIconChage = (iconName)=> {
                console.log("TCL: AddProjectForm -> onIconChage -> iconName", iconName)
                this.setState({
                    cardIcon : iconName
                })

            }


            // ?--------------------------------------
            // ? Create New Project
            // ! Save Project Data
            // ?--------------------------------------
            createNewProject = (event)=> {
                event.preventDefault();
                this.setState({isLoaded : false})
                console.log("TCL: AddProjectForm -> createNewProject -> this.state", this.state)
                this.saveProject();
            }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            // --------------------------------------
            // Format Values
            // --------------------------------------
            formatDate = (date) => {
                const productDate = new Date(date);
                return productDate.toLocaleDateString();
            }




            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderAddProjectForm() {

                // const {productOverview} = this.props;
                const { 
                        projectName, owner, cardIcon, createdDate, 
                        lastUpdateDate, coOwner, cardColor  ,
                        softwareTopic,softwareTopicName,
                        softwareTopicValues,shortDescription, vendorValues,
                        vendor,subCapabilitesValues, subCapability, 
                        proCategories, proCategory, productKeyword, keywordsList
                    } = this.state;
                let capOptions = this.createOptions(subCapabilitesValues);
				
        

                return (
                    <Fragment>
                        <div className="xpl-cardWideHeader ">
    
    
                            <div className="container-fluid">
    
    
                                <div className="row">
    
                                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                                           <EditableProjectCard 
                                                cardHover = {false}  
                                                projectColor = {cardColor}
                                                iconValue = {cardIcon}
                                                productName = {projectName}
                                                softwareTopic = {softwareTopicName}
                                           />
                                        </div>
    
    
                                        <div className="col-xl-7 col-lg-7 col-md-12">
                                            <div className="row">
                                               
                                                <FieldItem 
                                                    fieldName = {"Project Name"} 
                                                    fieldValue = {projectName} 
                                                    inputName = {'projectName'} 
                                                    editField = {true} 
                                                    // onChangeInput = {(event) => this.onInputChage(event)}
                                                    onChangeInput = {this.onInputChage}
                                                    
                                                />



                                                <FieldSelect
                                                    fieldName = {"Software Topic"} 
                                                    fieldValue = {softwareTopic} 
                                                    optionsData = {softwareTopicValues}
                                                    inputName = {'softwareTopic'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    // onChangeInput = {this.onChangeSelect}
                                                    onChangeInput = {this.onSoftTopicsSelectChage}
                                                    placeholder = {'Select Software Topic'}
                                                />

                                                
                                                

                                                <FieldSelect
                                                    fieldName = {"Vendor"} 
                                                    fieldValue = {vendor} 
                                                    optionsData = {vendorValues}
                                                    inputName = {'vendor'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    onChangeInput = {this.onChangeSelect}
                                                    placeholder = {'Select Vendor'}
                                                />



                                                <FieldSelect
                                                    fieldName = {"Product Categories"} 
                                                    fieldValue = {proCategory} 
                                                    optionsData = {proCategories}
                                                    inputName = {'proCategory'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    onChangeInput = {this.onChangeSelect}
                                                    placeholder = {'Select Product Category'}
                                                />


                                              


                                                {
                                                   /* subCapabilitesValues.length > 0 ?
                                                        <FieldSelect
                                                            fieldName = {"Sub Category"} 
                                                            fieldValue = {subCapability} 
                                                            optionsData = {capOptions}
                                                            inputName = {'subCapability'} 
                                                            editField = {true} 
                                                            isMulti =  {true}
                                                            mandatory = {true}
                                                            onChangeInput = {this.onChangeSelect}
                                                            isSearchable = {false}
                                                            placeholder = {'Select Subcategory'}
                                                        />
                                                        :
                                                        <span>  No Sub Categories </span>
                                                    */
                                                }

                                          

                                             
                                          
                                            </div>

                                          {/*  
                                            <div className="row">
                                               
                                                <FieldSelect
                                                    fieldName = {"Product Keywords"} 
                                                    fieldValue = {proCategory} 
                                                    optionsData = {proCategories}
                                                    inputName = {'keywords'} 
                                                    editField = {true} 
                                                    isMulti = {true}
                                                    mandatory = {true}
                                                    onChangeInput = {this.onChangeSelect}
                                                    placeholder = {'Select Product Keywords'}
                                                />

                                            </div> */}
                                        </div>
                                        
    
                                </div>


                               



                                <div className="row">
                                        <FieldIcon
                                            fieldName = {"Card Icon"} 
                                            fieldValue = {cardIcon} 
                                            inputName = {'cardIcon'} 
                                            editField = {true} 
                                            colName = {'col-md-12 col-lg-12'}
                                            onIconChange = {(event) => this.onIconChage(event)}
                                        />
                                </div>

                            </div>
    
                        </div>
    
    
                        <div className="xpl-cardOverviewContainer container-fluid">
                            <h5 className = "xpl-boldText xpl-fieldSeparator" > Product Details </h5>


                                <div className="row">
                                        
                                    <div className="col-md-6">

                                        <FieldPicker 
                                            fieldName = {"Owner"} 
                                            fieldValue = {owner} 
                                            editField = {true} 
                                            inputName = {"Owner"}
                                            colName = {'col-md-12 col-lg-12'}
                                            onPickerChange = {this.onChangeInput}
                                            dynamicPicker = {false}
                                        />
                                     
                                        </div>
                                    
                                      
                                        <div className="col-md-6">


                                            <FieldPicker 
                                                fieldName = {"Co-Owner"} 
                                                fieldValue = {coOwner} 
                                                editField = {true} 
                                                inputName = {"CoOwner"}
                                                colName = {'col-md-12 col-lg-12'} 
                                                onPickerChange = {this.onChangeInput}
                                                dynamicPicker = {false}
                                            />
                                            
                                        </div>

                                    </div>
                                    
                                    {
                                        /*
                                              <FieldDate 
                                                fieldName = {"Uploaded"} 
                                                fieldValue = {createdDate} 
                                                editField = {false}  
                                                colName = {'col-md-12 col-lg-12'}
                                            />
                                            
                                        
                                            <div className="col-md-6">
                                            <FieldDate 
                                                fieldName = {"Last Update"} 
                                                fieldValue = {lastUpdateDate} 
                                                editField = {false} 
                                                colName = {'col-md-12 col-lg-12'}
                                            />

                                              <FieldPicker 
                                            fieldName = {"Owner"} 
                                            fieldValue = {owner} 
                                            editField = {true} 
                                            inputName = {"Owner"}
                                            colName = {'col-md-12 col-lg-12'}
                                            onPickerChange = {this.onChangeInput}
                                            dynamicPicker = {false}
                                        />
                                            <FieldPicker 
                                                fieldName = {"Co-Owner"} 
                                                fieldValue = {coOwner} 
                                                editField = {true} 
                                                inputName = {"CoOwner"}
                                                colName = {'col-md-12 col-lg-12'} 
                                                onPickerChange = {this.onChangeInput}
                                                dynamicPicker = {false}
                                            />
                                            </div>
                                    */}


                                <div className="row" style = {{marginTop : 25}}>
                                    
                                    <div className="col-md-6">
                                        <FieldItem 
                                            fieldName = {"Search Keywords (hit enter to add the word)"} 
                                            fieldValue = {productKeyword} 
                                            inputName = {'productKeyword'} 
                                            editField = {true} 
                                            colName = {'col-md-12 col-lg-12'} 
                                            // onChangeInput = {(event) => this.onInputChage(event)}
                                            onChangeInput = {this.onInputChage}
                                            onKeyPress ={ (event) => this.handleKeyPressAddProductKeyword(event)}
                                            useParentState = {true}
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <FieldRemovableList
                                            fieldName = {"Seach Keywords"} 
                                            listValues = {keywordsList} 
                                            colName = {'col-md-12 col-lg-12'} 
                                            inputName = {'keywordsList'} 
                                            editField = {true} 
                                            onClick = {this.removeSearchKeyword}
                                        />
                                    </div>
                            
                                   
                                </div>



                                <div className="row">
                                    
                                    <div className="col-md-12 col-lg-12">
                                        <FieldItem 
                                            fieldName = {"Description"} 
                                            inputName = {"shortDescription"}
                                            fieldValue = {shortDescription}  
                                            isTextArea = {true} 
                                            editField = {true} 
                                            // inputName = {'shortDescription'} 
                                            colName = {'col-md-12 col-lg-12'}
                                            onChangeInput = {(event) => this.onInputChage(event)}
                                        />
                                    </div>
                                    
                                </div>

                                <div className="row">
                                   <div className="xpl-buttonCenterContainer">
                                        <SingleButton
                                            buttonText={" Save "}
                                            buttonColor={"primary"}
                                            wideButton = {true}
                                            onClick={this.createNewProject}
                                        />
                                   </div>
                                </div>

                        </div> 
                    </Fragment>
                    
                );
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderAddProjectForm();
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    AddProjectForm.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default AddProjectForm;