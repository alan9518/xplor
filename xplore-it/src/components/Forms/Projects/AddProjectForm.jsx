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
    import {  FieldPicker, AppLoader,  FieldItem,  EditableProjectCard, FieldSelect, FieldIcon, SingleButton, FieldRemovableList, AlertManager  } from "../../../components";
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import {Endpoints} from '../../../services/endpoints';
    import { withRouter } from 'react-router';
    import axios from 'axios';
    import moment from 'moment';
    import {orderBy} from 'lodash';
    import {Config} from '../../../Config'
    const {spPath, Bussmodel} = Config // ? Host Path
 


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
            console.log("TCL: constructor -> props", props)
            this.state = {
                isLoaded: false,
                partID : this.props.productOverview.partID || '',
                partProjectID : this.props.productOverview.partProjectID || '',
                MfrPartID : this.props.productOverview.MfrPartID || '',
                projectName : this.props.productOverview.ProductName || '',
                softwareTopic : this.formatSttringtoArray(this.props.productOverview.SoftwareTopic) || [],
                softwareTopicName : '',
                softwareTopicValues : this.props.productOverview.SoftwareTopic || [],
                vendorValues : [],
                vendor : {},
                subCapabilitesValues : [],
                subCapability : {label : 'Select a SubCapability', value : ''},
                owner : this.props.productOverview.OwnerEmail || '', 
                createdDate : moment().format("MM/DD/YYYY") , 
                lastUpdateDate : moment().format("MM/DD/YYYY"), 
                coOwner : this.props.productOverview.CoownerEmail || '', 
                shortDescription : this.props.productOverview.ShortDescription ||  '',
                cardColor : this.props.productOverview.color || null,
                cardIcon :  this.setCardIcon(this.props.productOverview.IconValue) || '',
                showColorPicker : false,
                currentVendorID : 0,
                proCategories : [],
                proCategory : {label : 'Select a proCategory', value : ''},
                keywords : [],
                productKeyword : '',
                keywordsList : this.props.productOverview.SearchKeyword || [], 
                blockButton : false,
                dataUpdated : {}

            }
            this.onChangeSelect =  this.onChangeSelect.bind(this);
            this.onSoftTopicsSelectChage =  this.onSoftTopicsSelectChage.bind(this);
            // this.masterUsers = [];

            // console.log("TCL: constructor -> this.props", this.props)
        }



        


        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        async componentDidMount() {
            const pickersWidth = '175px';
            this.setState({isLoaded : false})

            // ? Get Data
            let dataLoaded = await this.loadAPI();
            
          

            // dataLoaded === true && this.setState({isLoaded : true})

            //? Preload Data from Details View
            if (this.props.editCard && this.props.productOverview) {
                const { 
                    OwnerFirstName, OwnerLastName, ProductType, CreatedDate, 
                    LastUpdateDate, CoownerFirstName, Customers, CoownerLastName  ,ShortDescription, 
                    ProductName, ProductScope, SoftwareTopic, SoftwareTopicID, SearchKeyword,
                    Vendors, partID, partProjectID,MfrPartID
                } = this.props.productOverview;

                console.log("TCL: componentDidMount -> this.props.productOverview", this.props.productOverview)
                // this.state.softwareTopicValues
                console.log("TCL: componentDidMount -> this.state", this.state)
                console.log("TCL: componentDidMount -> this.state.softwareTopicValues", this.state.softwareTopicValues)

                let softwareTopicValue = this.setSelectedOptionMultiple(this.state.softwareTopic, this.state.softwareTopicValues)
                
                // ? Get Vendors DataSource

                const getVendorsPromise =  await this.loadVendors(softwareTopicValue.ERPCompanyID);
                const getVendorsData =  await getVendorsPromise.data;
                console.log("TCL: componentDidMount -> getVendorsData", getVendorsData)
                const Vendor = this.createOptionsVendors(getVendorsData).filter(i=>i.label === Vendors)
                console.log("TCL: componentDidMount -> getVendorsID",Vendor[0])

                //load product categories or type
                const getProCategoryPromise =  await this.loadProCategories();
                const getProCategoryData =  await getProCategoryPromise.data;
                console.log("TCL: componentDidMount -> getVendorsData", getProCategoryData)
                const ProCategory = this.createOptionsProCat(getProCategoryData).filter(i=>i.label == ProductType)
                console.log("TCL: componentDidMount -> getVendorsID",ProCategory[0])
                
                this.setState({
                    projectName : ProductName,
                    shortDescription : ShortDescription,
                    keywordsList : SearchKeyword.split(','),
                    vendorValues : this.createOptionsVendors(getVendorsData),
                    softwareTopic : softwareTopicValue,
                    // softwareTopicName : softwareTopicValue.label,
                    vendor : Vendor[0],
                    // vendor : this.props.productOverview.Vendors,
                    proCategory : ProCategory[0],
                    isLoaded : dataLoaded === true && true,
                    // keywordsList : this.props.productOverview.SearchKeyword.split(',') || [], 

                })
                
            }
            
            
            else
                dataLoaded === true && this.setState({isLoaded : true})


                console.log("TCL: componentDidMount -> ProductDetails",this.state)
                
            // ? Init People Pickers
            setTimeout(() => {
                
                    
                window.initializePeoplePicker('peoplePickerOwner', pickersWidth, 19);
                window.initializePeoplePicker('peoplePickerCoOwner', pickersWidth, 31);

                this.fillPickers();
              
                
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
                    // isLoaded : true,
                    softwareTopicValues : softwareTopicValues,
                    proCategories : this.createOptionsProCat(proCategoriesData.data),
                    // vendorValues : this.createOptionsVendors(vendorsData.data),
                    showError : false,
                })

                return true;
            

            }
            catch(error) {
                console.log('​Dashboard -> catch -> error', error)
                this.setState({isLoaded : true, showError : true})


                return false;
            }
        }



        formatSttringtoArray(stringValues) {
            if(!stringValues)
                return [];


            // ? Convert String to Array\
            let arrayValues = stringValues.split(',')

            //  ? Add Order
            // ? Iterate and Add Order
            const orderedArray = arrayValues.map((value, index)=> {
                let arraItem =  {
                    value : value,
                    order : index
                }

                return arraItem
            })


            return orderedArray;
        }



    /* ==========================================================================
    ** LOAD API
    ** ========================================================================== */



        // --------------------------------------
        // Load WebService Categories
        // --------------------------------------
        async loadAPICategories() {
            const params = {Bussmodel: Bussmodel}
            return axios.get(Endpoints.getAllCategories, {params});
        }   



        
        // --------------------------------------
        // Load WebService Categories
        // 13 as default Value
        // --------------------------------------
        async loadVendors(ERPCompanyID = '13') {
            // const {ERPCompanyID} = this.state;
            console.log("TCL: loadVendors -> ERPCompanyID", ERPCompanyID)
            // const params = {erpid: ERPCompanyID.toString()}
            const params = {Bussmodel:'XPLOR'}
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
            const params = {Bussmodel: Bussmodel}
            return axios.get(Endpoints.getProCategories, {params});
        }


        // --------------------------------------
        // Check IF Name is Repeated
        // --------------------------------------
        async checkRepeatedName (currentProjectName){
            const params = { productName : currentProjectName, Bussmodel: Bussmodel}
            return axios.get(Endpoints.checkRepeatedProjectName, {params});
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

                

                

                return softwareTopicValues;

            }
            catch(error) {
                
                this.setState({isLoaded : true, showError : true})

              
            }

        }




        // !--------------------------------------
        // ! Create New Project
        // /?    "productName":"Xplore IT New Pro3",
        // /?    "vendorMfdID":1227, (From getMaufacturer web service) 
        // /?    "mpnDescription":"Xplore IT New Pro3 is a new Product",
        // /?     "cpnSearch"
        // /?    "bussModel":"XPLOR",
        // /?    "erpCompanyID":11, (From getCustomer web service)
        // /?    "customerID":1014, (From getCustomer web service)
        // /?    "proCategoryID":3228, (From getProCategory web service)
        // /?    "ownerID":4033, (From getUsers web service)
        // /?    "delegateID":4033, (From getUsers web service)
        // /?    "userID":"JOSE.VAZQUEZ2@FLEX.COM"
        // !--------------------------------------
        saveProject = async () => {
            // const formData =  new FormData();
            const userDetails = window.getCurrentSPUser();
            const valid = this.validateReq();
                console.log("TCL: saveProject -> valid", valid)

            if(valid)
            {
                //? Create Request Data
                const data = JSON.stringify({
                    'newPro' : {
                        'productName' : this.state.projectName,  
                        'vendorMfdID' : this.state.vendor.value, 
                        'mpnDescription' : this.state.shortDescription,
                        'cpnSearch' : this.formatSearchKeywords(),
                        'bussModel' : 'XPLOR',
                        // 'erpCompanyID' : this.state.softwareTopic.ERPCompanyID,
                        // 'customerID' : this.state.softwareTopic.CustomerID,
                        'proCategoryID' : this.state.proCategory.value,
                        'ownerID' : this.getPeoplePickerData('Owner'),
                        'delegateID' : this.getPeoplePickerData('CoOwner'),
                        'categories' : this.formatFunctionalCategoryValues(this.state.softwareTopic),
                        'userID' : userDetails.user_email
                    }
                })
                
                
                // ? Send Promise Request
                
                return axios({
                    method : 'post',
                    url : Endpoints.createNewProject,
                    headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "application/json"},
                    data : data
                    
                });
            }
            else
            {
                return "Not Valid";
            }

        }



        // --------------------------------------
        // Validate empty Fields
        // --------------------------------------
        
        validateReq () {
            let valid=false;
            try{
                if(!this.validCondition(this.state.projectName))
                    valid =  true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.state.vendor.value))
                    valid = true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.state.shortDescription))
                    valid = true;
                
                else
                    valid = false;
            
                if(valid && !this.validCondition(this.formatSearchKeywords()))
                    valid = true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.state.softwareTopic.ERPCompanyID))
                    valid = true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.state.softwareTopic.CustomerID))
                    valid = true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.state.proCategory.value))
                    valid = true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.getPeoplePickerData('Owner')))
                    valid = true;
                
                else
                    valid = false;
                
                if(valid && !this.validCondition(this.getPeoplePickerData('CoOwner')))
                    valid = true;
                
                else
                    valid = false;

                
                return valid
            }
            catch(error) {
                console.log("TCL: validateReq -> error", error)
                
                return false;  
            }
        }


        // --------------------------------------
        // Validate Empty Fields
        // --------------------------------------

        validCondition(proValue) {
            console.log("TCL: validCondition -> proValue", proValue)
            if(proValue === "" || proValue === null || proValue === "null" || proValue === "undefined")
                return true
            else
                return false
        }


        // ?--------------------------------------
        // ? Set Form Data for MultiArray of st
        // ? param functional array
        // [{label : '', },{label : '', }} ]
        // ?--------------------------------------
        formatFunctionalCategoryValues(functionData) {
            console.log("TCL: formatFunctionalCategoryValues -> functionData", functionData)
            if(!functionData)
                return [];
            
            
            const data = functionData.map((funtionalItem) => {
                return funtionalItem.label
            })
            console.log("TCL: formatFunctionalCategoryValues -> data", data)

            return data
            
        }


        // !--------------------------------------
        // ! update Project Call
        // ! Update Product overview
        // !--------------------------------------

        updateProject = async () => {
            // const formData =  new FormData();
            const userDetails = window.getCurrentSPUser();
            const valid = this.validateReq();
                console.log("TCL: updateProject -> valid", valid)
            

            if(valid)
            {
                //? Create Request Data
                //? For Product Overview Update
                const data = JSON.stringify({
                    'updatePp' : {
                        'partId' : this.state.partID,
                        'partProjectId' : this.state.partProjectID,
                        'productName' : this.state.projectName,  
                        'vendorMfdID' : this.state.vendor.value, 
                        'MfrPartID' : this.state.MfrPartID,
                        'mpnDescription' : this.state.shortDescription,
                        'cpnSearch' : this.formatSearchKeywords(),
                        'bussModel' : 'XPLOR',
                        'erpCompanyID' : this.state.softwareTopic.ERPCompanyID,
                        // 'customerID' : this.state.softwareTopic.CustomerID,
                        // 'customerID' : this.formatFunctionalCategoryValues(this.state.softwareTopic),
                        'categories' : this.formatFunctionalCategoryValues(this.state.softwareTopic),
                        'proCategoryID' : this.state.proCategory.value,
                        'ownerID' : this.getPeoplePickerData('Owner'),
                        'delegateID' : this.getPeoplePickerData('CoOwner'),
                        'userID' : userDetails.user_email
                    }
                })


                let dataToUpdateView = Object.assign({}, JSON.parse(data))
                    dataToUpdateView.ownerValues = this.getPeoplePickerData('Owner', true);
                    dataToUpdateView.coOwnerValues = this.getPeoplePickerData('CoOwner', true);

                console.log("TCL: AddProjectForm -> updateProject -> dataToUpdateView", dataToUpdateView)

                this.setState({dataUpdated : dataToUpdateView})

                console.log("TCL: updateProject -> Date",data)
                // ? Send Promise Request

                return axios({
                    method : 'post',
                    url : Endpoints.updateProject,
                    headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "application/json"},
                    data : data
                    
                });
            }
            else
            {
                return "Not Valid";
            }

        }




        // ?--------------------------------------
        // ? Update Project 
        // ? to Add Icon
        // ? PartRecordID []
        // ?--------------------------------------
        updateProductOverview = async (newPartID, PartRecordID, valueid) => {
            console.log("TCL: updateProductOverview -> newPartID", newPartID)
            console.log("TCL: updateProductOverview -> Value ID", valueid)
            
            
            const {cardIcon} = this.state;
            const userDetails = window.getCurrentSPUser();

            // let icon = ""

            let icon = "";
            if(!cardIcon || cardIcon === "" )
                icon = this.props.productOverview.IconValue
            else
                icon = cardIcon

            // ? Create Request Data
            // ? Card Icon 
            // [{"BussinessModelName":"XPLOR","ProductName":"update test 3","BusinessModelID":2217,"ManufacturedPartID":12001,"PartID":16360,"PartProjectID":11683,"ProjectLineID":17669,"PartRecordID":[94221,94222,94223,94224,94225]}]{"d":null}
            // ? Categories
            let data =  JSON.stringify({
                'attrvals':
                    [
                        {
                            'partrecordid': PartRecordID,
                            'attrdefid':6916,
                            'IsMulti': 0,
                            'updated_by': userDetails.user_email ,
                            'value': [icon],
                            'valueid': [valueid],
                            'seq': ['1']
                        }
                    ]
                })


            console.log("TCL: updateProductOverview -> data", data)
                
            // ? Send Promise Request

            return axios({
                method : 'post',
                url : Endpoints.updateTabAttributes,
                headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "application/json"},
                data : data
                
            });


        }




        // ?--------------------------------------
        // ? Update Product Overview
        // ? Main View
        // ?--------------------------------------
        updateProductOverviewFullTab = async () => {
            // console.log("TCL: updateProductOverview -> event", event)
            // event.preventDefault();
            
            console.log("TCL: updateCurrentProjectOverview -> updateInputData", this.state.partID)
            const PartID=this.state.partID;

            //Update Product Overview

            const updateProjectPromise =  await this.updateProject();
            if(updateProjectPromise !== "Not Valid")
            {
                this.setState({isLoaded : false})
                const updateProjectResponse =  await updateProjectPromise.data;
                console.log("TCL: createNewProject -> createNewProjectResponse", updateProjectResponse)
            
                // if(updateProjectResponse === "Successfully updated the project")
                    // this.createAlert('info', 'The Project details was updated Successfully')
                             

                //Update Project Icon Image as Attribute Value
                const partRecordCall = await axios.get(Endpoints.getPartRecord, {params: {partid : this.state.partID}});
                const readPartRecord = await partRecordCall.data;
                const iconJSON = readPartRecord.filter(i => i.BusinessTypeID === 3095)[0];
                let iconValudID = "0";
                console.log("TCL: updateCurrentProjectOverview -> getPartRecordID", iconJSON.PartRecordID)
                console.log("TCL: updateCurrentProjectOverview -> Latest Image Icon", this.state.cardIcon)

                let tabsDataAttrPromise = await axios.get(Endpoints.getTabAttributes, {params: {partid : PartID, busstypeid : 3095, Bussmodel: Bussmodel}});
                let tabsAttrData = await tabsDataAttrPromise.data;
                let tabsAttrDataIcon = tabsAttrData.filter(i=>i.attrName==="Product Image Icon Name")
                let valueID = tabsAttrDataIcon[0].valueID;
                if(valueID !== "")
                {
                    console.log("TCL: updateCurrentProjectOverview -> Image Icon Exists", true)
                    iconValudID = valueID;
                }
                else
                    console.log("TCL: updateCurrentProjectOverview -> Image Icon Exists", false)
                

                const passValID = iconValudID
                console.log("TCL: updateCurrentProjectOverview -> Icon ValueID",passValID)


                this.updateProductOverview(PartID, iconJSON.PartRecordID,passValID).then((data) => {
                    console.log("TCL: updateProductOverviewFullTab -> data", data)
                    
                    this.createAlert('info', 'The data has been updated successfully');    
                    this.setState({isLoaded : true});

                    this.props.toggleFieldsAfterUpdate(this.state.dataUpdated, this.state)

                    // this.props.toggleFields()

                    document.getElementsByClassName('rc-tabs-bar')[0].style.pointerEvents = "all"

                
                  }).catch((error) => {
                    console.log("TCL: createNewProject -> error", error)
                      
                  })
                }
                else
                {
                    this.createAlert('error', 'The Project was not Created Successfully and the form not filled since all fields are mandatory');
                }
            // ? Update Project to add the icon
            

            this.setState({blockButton : false})

            // Create Data Object 
            
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
        getPeoplePickerData(peoplePicker, allFields = false) {
            const pickerName = `peoplePicker${peoplePicker}_TopSpan_HiddenInput`
            const pickerValue = document.getElementById(pickerName).value;
            if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                return null;
            else
            {
                const picker = JSON.parse(pickerValue) || {};

                if(allFields)
                    return picker[0];
                else
                    return picker[0].Description;
            }
            
            
            // const picker = JSON.parse(document.getElementById(pickerName).value);
            
        }

    /* ==========================================================================
    ** Handle State
    ** ========================================================================== */



     
    
        // !--------------------------------------
        // ! Create New Project
        // ! Save Project Data
        // !--------------------------------------
        createNewProject = async (event)=> {
            event.preventDefault();

            if(this.state.blockButton ===  true)
                return;

            this.setState({blockButton : true})

            
            
            console.log("TCL: AddProjectForm -> createNewProject -> this.state", this.state)
            try {


                // TODO : Update Content When is Changed to JSON Format
                // ? Check IF Project Already Exists

                const isProjectRepeatedPromise = await this.checkRepeatedName(this.state.projectName);
                const isProjectRepeated = await isProjectRepeatedPromise.data;
                console.log("TCL: createNewProject -> isProjectRepeated", isProjectRepeated)

                if(isProjectRepeated === 1) {
                    // ? The Project Name already Exists
                    this.createAlert('The Name is alredy on Use');

                    return ;
                }





                // ? Sage New Project
                const createNewProjectPromise =  await this.saveProject();
                if(createNewProjectPromise !== "Not Valid"){
                    this.setState({isLoaded : false})
                    const createNewProjectResponse =  await createNewProjectPromise.data;
                    console.log("TCL: createNewProject -> createNewProjectResponse", createNewProjectResponse)


                    // Get New project ID from the reponse
                    let responseArray = createNewProjectResponse.split('{"d":null}')[0];
                    let jsonResponse = JSON.parse(responseArray)[0];
                    console.log("TCL: createNewProject -> jsonResponse", jsonResponse)

                    const { PartID, PartRecordID } = jsonResponse;

                    const partRecordCall = await axios.get(Endpoints.getPartRecord, {params: {partid : PartID}});
                    const readPartRecord = await partRecordCall.data;
                    const iconJSON = readPartRecord.filter(i => i.BusinessTypeID === 3095)[0];

                    console.log("TCL: createNewProject -> PartRecordID", iconJSON.PartRecordID)
                    console.log("TCL: createNewProject -> PartID", PartID)
                    

                    // ? Update Project to add the icon
                    this.updateProductOverview(PartID, iconJSON.PartRecordID,0).then((data) => {
                    console.log("TCL: createNewProject -> data", data)
                    
                        this.createAlert('info', 'The Project was Created Successfully');

                        this.setState({isLoaded : true})


                        setTimeout(() => {
                            // ?Redirect User
                            this.redirectUserToNewProject(PartID)
                        }, 100);

                       
                        
                        
                    }).catch((error) => {
                        console.log("TCL: createNewProject -> error", error)
                        
                    })

                }

                else
                {
                    this.createAlert('error', 'The Project was not Created Successfully and the form not filled since all fields are mandatory');
                }

                this.setState({blockButton : false})
            }
            catch(error) {
                console.log("TCL: createNewProject -> error", error)
                
            }
        }




        // ?--------------------------------------
        // ? Redirect User To New Project
        // ?--------------------------------------
        redirectUserToNewProject(PartID) {

            const {history} = this.props;
            
            const newProductpath = `${spPath}/app/details/${PartID}`
            
            history.push(newProductpath);

        }

        // !--------------------------------------
        // ! Update Curent Project Overview
        // ! Save Project Data
        // !--------------------------------------
        updateCurrentProjectOverview = async (event) => {
            console.log("TCL: updateCurrentProjectOverview -> event", event)
            event.preventDefault();

            if(this.state.blockButton ===  true)
                return;

            this.setState({blockButton : true})

            // let {valueid,valsequence,
            this.updateProductOverviewFullTab();                

        }


        // --------------------------------------
        // get partrecordID
        // --------------------------------------
        getPartRecordRead = async(partID) => {
            const tabsDataAttrPromise = await axios.get(Endpoints.getPartRecord, {params: {partid : this.partID}});
            const tabsAttrData = await tabsDataAttrPromise.data;
            return tabsAttrData;
        }
        

        // !--------------------------------------
        // ! Color Picker Component 
        // ! NOT LONGER USED
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
            const {label, value, subCap, color, ERPCompanyID}  = selectedOption[0];
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
        // ? Handle PeoplePicker Selction event
        // peoplePickerProductSponsor_TopSpan
        // peoplePickerProductSponsor_TopSpan_HiddenInput
        // peoplePickerProductSponsor_TopSpan_EditorInput
        // ?--------------------------------------
        
        onPeoplePickerResourceFocus = (event) => {
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
                // const pickerContainer = document.getElementById(`${pickerNameArray[0]}_TopSpan_HiddenInput`).value;
                let stateNameItemArray = pickerNameArray[0].split('peoplePicker')

            
                let newFormFields =  formFields.map((formItem, index) => {
                    if((formItem.attrName.toLowerCase()).replace(' ', '') === stateNameItemArray[1].toLowerCase()) 
                        formItem.attrValues = peoplePickerUserValue

                    return formItem

                })



            

                this.setState({formFields : newFormFields})
            }   


        }


        /** --------------------------------------
         * Set Select Option from Details View
        // @param {Option comes from Props, current selected }
        // @param {dataOptions data source }
        // @returns {{label : , value :}}
        // -------------------------------------- */
        setSelectedOption = (selOption, dataOptions, optionalFilter = null) =>  {
            console.log("TCL: setSelectedOption -> option", selOption);
            console.log("TCL: setSelectedOption -> dataOptions", dataOptions);

            let selectedOption = dataOptions.filter((option)=> {
                // option.CustomerID => software Topic Values
                if(selOption === option.label || optionalFilter === option.CustomerID) {
                    let opt = {'label' : option.label, value : option.value}

                    return opt;
                }
                    // return option
            })[0];
            console.log("TCL: setSelectedOption -> selectedOption", selectedOption)


            return selectedOption;
         
        }

        /** --------------------------------------
         * Set Select Option from Details View
        // @param {Option comes from Props, current selected }
        // @param {dataOptions data source }
        // @returns {{label : , value :}}
        // -------------------------------------- */
        setSelectedOptionMultiple = (selOption, dataOptions, optionalFilter = null) =>  {
            console.log("TCL: setSelectedOption -> option", selOption);
            console.log("TCL: setSelectedOption -> dataOptions", dataOptions);

            let selectedOptions = dataOptions.filter((option)=> {
                //   ? Iterate Selected Values
                for(let selOpt of selOption) {
                    // ? Match Values
                    if(selOpt.value === option.label || optionalFilter === option.CustomerID) {
                        let opt = {'label' : option.label, value : option.value, order: selOpt.order}

                        console.log("TCL: setSelectedOptionMultiple -> opt", opt)

                        option.order = selOpt.order
                        return opt;
                    }
                }
            });
            console.log("TCL: setSelectedOption -> selectedOption", selectedOptions)

            // ? Sort Array by order

            const orderedOptions = orderBy(selectedOptions, ['order'], 'asc' )
            console.log("TCL: setSelectedOptionMultiple -> orderedOptions", orderedOptions)


            return orderedOptions;
         
        }

        

        /** --------------------------------------
         * Set Select Option from Details View
        // @param {Option comes from Props, current selected }
        // @param {dataOptions data source }
        // @returns {{label : , value :}}
        // -------------------------------------- */
        getVendorsDataSource(vendorValues, softwareTopic) {
            console.log("TCL: getVendorsDataSource -> softwareTopic", softwareTopic)
            console.log("TCL: getVendorsDataSource -> vendorValues", vendorValues)
            // const {vendorValues} = this.state;
        }


        /** --------------------------------------
         * Set Card Icon
        // @param {icon value with : T: chart-line}
        // @returns {FA icon class name}
        // -------------------------------------- */
        setCardIcon = (cardIconName) => {
            let iconNameArray = cardIconName ? cardIconName.split(':') : ''
            console.log("TCL: setCardIcon -> iconNameArray", iconNameArray)

            if(iconNameArray.length >= 1)
                return iconNameArray[1];
            else    
                return cardIconName
            

        }


        // ?--------------------------------------
        // ? Fill PeoplePickers
        // ? only if values are !== from null
        // ?--------------------------------------
        fillPickers = ()=> {
            const {owner, coOwner} = this.state;
            if(owner !== '' )
                window.fillPeoplePicker(owner, 'Owner')
            if(coOwner !== '')
                window.fillPeoplePicker(coOwner, 'CoOwner')
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
        // Render Loader
        // --------------------------------------
        renderLoader () {
            return <div> <AppLoader customHeight = {800}/> </div>
        }



        // --------------------------------------
        // Render Alert Message
        // --------------------------------------
        createAlert = (alertType, alertMessage) =>{
            // return <AlertManager  alertType = {alertType}  alertMessage = {alertMessage} />
            alertType == "info"?
            Alert.info(alertMessage, {
                position: 'top',
                effect : 'slide',
                timeout : 1000
            
            })
            :Alert.error(alertMessage, {
                position: 'top',
                effect : 'slide',
                timeout : 20000
            
            })
        }

        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderAddProjectForm() {

            // const {productOverview} = this.props;
            const { 
                    projectName, owner, cardIcon, 
                    coOwner, cardColor  ,
                    softwareTopic,softwareTopicName,
                    softwareTopicValues,shortDescription, vendorValues,
                    vendor,subCapabilitesValues, subCapability, 
                    proCategories, proCategory, productKeyword, keywordsList
                } = this.state;
                console.log("TCL: renderAddProjectForm -> this.state", this.state)

                console.log("TCL: renderAddProjectForm -> owner", owner)
            // let capOptions = this.createOptions(subCapabilitesValues);
            
    
            // let softwareTopicValue = this.setSelectedOption(this.props.productOverview.SoftwareTopic, this.state.softwareTopicValues)
            
            // let vendorValue = this.setSelectedOption(this.props.productOverview.Vendors, this.state.vendorValues)


            // let vendorsDefaultValues = this.getVendorsDataSource(vendorValues, this.props.productOverview.SoftwareTopic);
            

            console.log("TCL: renderAddProjectForm -> this.props.updateProject ", this.props.updateProject )


            console.log("TCL: renderAddProjectForm -> this.props.productOverview.SoftwareTopic", this.props.productOverview.SoftwareTopic)
            console.log("TCL: renderAddProjectForm -> this.props.productOverview.Vendors", this.props.productOverview.Vendors)


            console.log("TCL: renderAddProjectForm -> this.state -> softwareTopic", softwareTopic)



            let coOwnerName = `${this.props.productOverview.CoownerFirstName} ${this.props.productOverview.CoownerLastName} `
            let ownerName = `${this.props.productOverview.OwnerFirstName} ${this.props.productOverview.OwnerLastName} `
            let functionalCategory = '';

            if(Array.isArray(softwareTopic) ===  true && softwareTopic.length > 0) 
                functionalCategory   = softwareTopic[0].label
            else
                functionalCategory   = softwareTopic

            return (
                <Fragment>
                    <div className="xpl-cardWideHeader ">


                        <div className="container-fluid">


                            <div className="row">

                                    

                                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">

                                        <h2 style = {{marginBottom:40}}> Product Overview  </h2>

                                       <EditableProjectCard 
                                            cardHover = {false}  
                                            projectColor = {cardColor}
                                            iconValue = {cardIcon !== '' ? cardIcon : this.props.productOverview.IconValue}
                                            productName = {projectName}
                                            softwareTopic = {functionalCategory}
                                       />
                                    </div>

                                         


                                    <div className="col-xl-7 col-lg-7 col-md-12">
                                        <div className="row">

                                        
                                            {
                                                // ? If the view comes from DetailsView Component
                                                // ? Show a cancel edit Button
                                                // ? xpl-editButtonContainer => Push button to the right
                                                this.props.editCard &&
                                                
                                                    <div className="xpl-editButtonContainer xpl-editButtonContainerEnd">
    
                                                        <SingleButton
                                                            buttonText={"Cancel"}
                                                            buttonColor={"primary"}
                                                            onClick={this.props.toggleFields}
                                                        />
                                                    </div>
                                                

                                            
                                            }
                                           
                                            <FieldItem 
                                                fieldName = {"Product Name"} 
                                                fieldValue = {projectName} 
                                                inputName = {'projectName'} 
                                                editField = {true} 
                                                // onChangeInput = {(event) => this.onInputChage(event)}
                                                onChangeInput = {this.onInputChage}
                                                maxLength = {"50"}
                                            />



                                            <FieldSelect
                                                fieldName = {"Functional Category"} 
                                                fieldValue = {softwareTopic} 
                                                // defaultComboValue = {this.props.productOverview.SoftwareTopic}
                                                defaultComboValue = {this.state.softwareTopic}
                                                optionsData = {softwareTopicValues}
                                                inputName = {'softwareTopic'} 
                                                editField = {true} 
                                                mandatory = {true}
                                                isMulti = { true }
                                                // onChangeInput = {this.onChangeSelect}
                                                onChangeInput = {this.onSoftTopicsSelectChage}
                                                placeholder = {'Select Functional Category'}
                                            />

                                            
                                            { 
                                                /* // TODO Replace for Vendors 
                                                    ! Use productOverview.Customers instead of vendors   
                                                   
                                                */ 
                                            }
                                        

                                            <FieldSelect
                                                fieldName = {"Vendor"} 
                                                fieldValue = {vendor} 
                                                defaultComboValue = {this.props.productOverview.Vendors}
                                                optionsData = {vendorValues}
                                                inputName = {'vendor'} 
                                                editField = {true} 
                                                mandatory = {true}
                                                onChangeInput = {this.onChangeSelect}
                                                placeholder = {'Select Vendor'}
                                            />



                                            { 
                                                /* // TODO Replace for Product Categoruies 
                                                    ! Use productOverview.ProductType instead of Categoruies   
                                                   
                                                */ 
                                            }
                                            <FieldSelect
                                                fieldName = {"Techical Classification"} 
                                                fieldValue = {proCategory} 
                                                defaultComboValue = {this.props.productOverview.ProductType}
                                                optionsData = {proCategories}
                                                inputName = {'proCategory'} 
                                                editField = {true} 
                                                mandatory = {true}
                                                onChangeInput = {this.onChangeSelect}
                                                placeholder = {'Select Technical Classification'}
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
                                        selectedIcon = {this.props.productOverview.IconValue}
                                        inputName = {'cardIcon'} 
                                        editField = {true} 
                                        colName = {'col-md-12 col-lg-12'}
                                        onIconChange = {(event) => this.onIconChage(event)}
                                    />
                            </div>

                        </div>

                    </div>


                    <div className="xpl-cardOverviewContainer container-fluid">
                        <h5 className = "xpl-boldText xpl-fieldSeparator xpl-separatorTitle" > Product Details </h5>


                            <div className="row">
                                    
                                <div className="col-md-6">

                                    <FieldPicker 
                                        fieldName = {"Owner"} 
                                        fieldValue = {owner} 
                                        editField = {true} 
                                        inputName = {"Owner"}
                                        colName = {'col-md-12 col-lg-12'}
                                        userName = {ownerName}
                                        // onPickerChange = {this.onChangeInput}
                                        dynamicPicker = {false}
                                    />
                                 
                                    </div>
                                
                                  
                                    <div className="col-md-6">


                                        <FieldPicker 
                                            fieldName = {"Co-Owner"} 
                                            fieldValue = {coOwner} 
                                            editField = {true} 
                                            inputName = {"CoOwner"}
                                            userName = {coOwnerName}
                                            colName = {'col-md-12 col-lg-12'} 
                                            // onPickerChange = {this.onChangeInput}
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
                                        maxLength = {"100"}
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
                                        onChangeInput = {this.onInputChage}
                                        maxLength = {"500"}
                                    />
                                </div>
                                
                            </div>

                            <div className="row">
                               <div className="xpl-buttonCenterContainer">
                                    <SingleButton
                                        buttonText = {this.props.updateProject === true ? "Update" : "Save"}
                                        buttonColor={"primary"}
                                        wideButton = {true}
                                        blockButton =  {this.state.blockButton }
                                        onClick = {this.props.updateProject === true ? this.updateCurrentProjectOverview : this.createNewProject }
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
            const {isLoaded} = this.state
            return isLoaded === true ? this.renderAddProjectForm() : this.renderLoader();
        }
}


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
AddProjectForm.propTypes = {
    updateProject: PropTypes.bool
};


AddProjectForm.defaultProps = {
    updateProject: false
};


// --------------------------------------
// Export Component
// --------------------------------------
export default withRouter(AddProjectForm);