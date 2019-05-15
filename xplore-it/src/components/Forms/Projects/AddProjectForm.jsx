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
    import {  FieldPicker, FieldDate, FieldItem,  EditableProjectCard, FieldSelect, FieldIcon, SingleButton  } from "../../../components";
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
                    ERPCompanyID : 0

                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onSoftTopicsSelectChage =  this.onSoftTopicsSelectChage.bind(this);
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                this.loadAPI();
                this.initPickers()
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

                    // Get Vendors
                    // const vendorsPromise = this.loadVendors();

                    // Resolve Both Promises
                    // const [apiRoutes, SPRoutes, vendorsData] = await Promise.all([apiRoutesPromise,SPRoutesPromise, vendorsPromise]);
                    const [apiRoutes, SPRoutes] = await Promise.all([apiRoutesPromise,SPRoutesPromise]);
					
                    
                    // Get Routes Values
                    const apiRoutesData =  apiRoutes.data;
                   

                    // Prepare SP Routes
                    const SPRoutesData = this.createSPArray(SPRoutes.data.value);


                    const softwareTopicValues = this.mergeCat(apiRoutesData, SPRoutesData)
					

                    

                    this.setState({
                        // categories : appRoutes || [],
                        isLoaded : true,
                        softwareTopicValues : softwareTopicValues,
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
                                selectOption.subCap = apiRoute.SubCap || []
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
                onInputChage = (event)=> {
					console.log("TCL: AddProjectForm -> onInputChage -> event", event)
                    this.setState({
                        [event.target.name]: event.target.value
                    })
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
                    const {label, value, subCap}  = selectedOption;
                    // Get Category Name
                    let valueArray =  value.split('-');
                    let colorValue =  valueArray[0];
                    let softValue = valueArray[1];


                    // Set SubCap and ID for Vendors Request
                    if(subCap.length > 0) {
                        this.setState({
                            softwareTopic: value,
                            softwareTopicName : softValue,
                            cardColor : colorValue,
                            subCapabilitesValues : subCap,
                            subCapability : {},
                            ERPCompanyID : selectedOption.ERPCompanyID
                            // selectedSoftwareTopic
                        })
                    }
                    else 
                        this.setState({
                            softwareTopic: value,
                            softwareTopicName : softValue,
                            cardColor : colorValue,
                            subCapabilitesValues : [],
                            subCapability : {},
                            ERPCompanyID : selectedOption.ERPCompanyID
                            // selectedSoftwareTopic
                        })


                    // GET Vendors
                    if (!this.state.ERPCompanyID ===  selectedOption.ERPCompanyID) {
                        this.loadVendors(selectedOption.ERPCompanyID)
                            .then((vendorsData)=> {
                                console.log("TCL: onSoftTopicsSelectChage -> data", vendorsData)
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
							console.log("TCL: AddProjectForm -> createOptions -> value", value)
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
                            selectValue.value = value.ERPCompanyID

                            return selectValue;
                        }
                    
                    }).filter((item)=> {return item !== undefined})
                    


                    return selectValues;
                    
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
            // ?--------------------------------------
                createNewProject = (event)=> {
                    event.preventDefault();
					console.log("TCL: AddProjectForm -> createNewProject -> this.state", this.state)
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
                        vendor,subCapabilitesValues, subCapability
                    } = this.state;
                let capOptions = this.createOptions(subCapabilitesValues);
				console.log("TCL: AddProjectForm -> renderAddProjectForm -> capOptions", capOptions)
        

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
                                                    onChangeInput = {(event) => this.onInputChage(event)}
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
                                                />

                                                
                                                

                                                <FieldSelect
                                                    fieldName = {"Vendor"} 
                                                    fieldValue = {vendor} 
                                                    optionsData = {vendorValues}
                                                    inputName = {'vendors'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    
                                                    onChangeInput = {this.onChangeSelect}
                                                />



                                                


                                              


                                            {
                                                subCapabilitesValues.length > 0 && 
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
                                                    />
                                            }

                                          

                                             
                                          
                                            </div>
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
                                        <FieldDate 
                                            fieldName = {"Uploaded"} 
                                            fieldValue = {createdDate} 
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
                                        />
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <FieldDate 
                                            fieldName = {"Last Update"} 
                                            fieldValue = {lastUpdateDate} 
                                            editField = {false} 
                                            colName = {'col-md-12 col-lg-12'}
                                        />
                                        <FieldPicker 
                                            fieldName = {"Co-Owner"} 
                                            fieldValue = {coOwner} 
                                            editField = {true} 
                                            inputName = {"CoOwner"}
                                            colName = {'col-md-12 col-lg-12'} 
                                            onPickerChange = {this.onChangeInput}
                                        />
                                    </div>
                            
                                </div>



                                <div className="row">
                                    
                                    <div className="col-md-12 col-lg-12">
                                        <FieldItem 
                                            fieldName = {"Description"} 
                                            fieldValue = {shortDescription}  
                                            isTextArea = {true} 
                                            editField = {true} 
                                            inputName = {'shortDescription'} 
                                            colName = {'col-md-12 col-lg-12'}
                                            // onChange = {this.onInputChange}
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