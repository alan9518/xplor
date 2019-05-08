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
                    subCategoriesValues : [],
                    owner : '', 
                    createdDate : moment().format("DD/MM/YYYY") , 
                    lastUpdateDate : moment().format("DD/MM/YYYY"), 
                    coOwner : '', 
                    shortDescription : '',
                    cardColor : null,
                    cardIcon :  '',
                    showColorPicker : false

                }
                // this.onInputChange = this.onInputChange.bind(this)
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

                    // Resolve Both Promises
                    const [apiRoutes, SPRoutes] = await Promise.all([apiRoutesPromise,SPRoutesPromise]);
					
                    
                    // Get Routes Values
                    const apiRoutesData =  apiRoutes.data;
                   

                    // Prepare SP Routes
                    const SPRoutesData = this.createSPArray(SPRoutes.data.value);


                    const softwareTopicValues = this.mergeRoutes(apiRoutesData, SPRoutesData)
					

                    

                    this.setState({
                        // categories : appRoutes || [],
                        isLoaded : true,
                        softwareTopicValues : softwareTopicValues,
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
            mergeRoutes(APIRoutes, SPRoutes) {

            
                try {
                    const softwareTopicValues = APIRoutes.map((apiRoute) => {
                    

                        let selectOption = {};

                        for(let SPRoute of SPRoutes) {
                            if(apiRoute.CustomerName === SPRoute.name) {
                                selectOption.label = apiRoute.CustomerName;
                                selectOption.value = `${SPRoute.color}-${apiRoute.CustomerName}`
                            }
                        }

                        return selectOption;

                    });

                    console.log("TCL: AddProjectForm -> mergeRoutes -> softwareTopicValues", softwareTopicValues)

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


            // ?--------------------------------------
            // ? Set Card Color
            // ?--------------------------------------
                onColorChange = (colorCode)=> {
					console.log("TCL: AddProjectForm -> onColorChange -> colorCode", colorCode)
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
            // ? On InputChage
            // ?--------------------------------------
                onSoftTopicsSelectChage = (event)=> {
                    console.log("TCL: AddProjectForm -> onInputChage -> event", event)
                    const {label, value}  = event;
                    let valueArray =  value.split('-');
                    let colorValue =  valueArray[0];
                    let softValue = valueArray[1];

                    this.setState({
                        softwareTopic: value,
                        softwareTopicName : softValue,
                        cardColor : colorValue
                        // selectedSoftwareTopic
                    })
                }




            // ?--------------------------------------
            // ? On IconChage
            // ?--------------------------------------
                onIconChage = (iconName)=> {
                    console.log("TCL: AddProjectForm -> onIconChage -> iconName", iconName)
                    // const {value} = event.target;
                    // console.log("TCL: AddProjectForm -> onIconChage -> value", value)
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
                        softwareTopicValues,shortDescription, vendorValues,subCategoriesValues
                    } = this.state;
        

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
                                                    fieldName = {"Vendor"} 
                                                    fieldValue = {null} 
                                                    optionsData = {vendorValues}
                                                    inputName = {'softwareTopic'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    
                                                    onChangeInput = {(event) => this.onSoftTopicsSelectChage(event)}
                                                />



                                                


                                                <FieldSelect
                                                    fieldName = {"Software Topic"} 
                                                    fieldValue = {softwareTopic} 
                                                    optionsData = {softwareTopicValues}
                                                    inputName = {'softwareTopic'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    
                                                    onChangeInput = {(event) => this.onSoftTopicsSelectChage(event)}
                                                />



                                               <FieldSelect
                                                    fieldName = {"Sub Category"} 
                                                    fieldValue = {null} 
                                                    optionsData = {subCategoriesValues}
                                                    inputName = {'softwareTopic'} 
                                                    editField = {true} 
                                                    mandatory = {true}
                                                    onChangeInput = {(event) => this.onSoftTopicsSelectChage(event)}
                                               />

                                          

                                             
                                          
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