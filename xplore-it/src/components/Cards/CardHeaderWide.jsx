/* ==========================================================================
 * Header Of Wide Card
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ProjectCard , FieldItem, SingleButton, AddProjectForm, FieldRemovableList,FieldPicker, FieldList} from "../../components";
import "./styles.css";
// import ListItem from "./CardHeaderListItem";
// import {  } from '../../components'
import { startCase } from "lodash";


// --------------------------------------
// Create Component Class
// --------------------------------------
class CardHeaderWide extends Component {


    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */

    
        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                responsiveWidth : window.innerWidth,
                isLoaded: false,
                blockEdit : false
            }
        }


        // --------------------------------------
        // Constructor
        // --------------------------------------
        componentDidMount() {
            window.addEventListener("resize", this.updateContainerDimensions);
            let blockEdit = localStorage.getItem('xplorITOwner') !== null ? false : true

            // ? If the user is not on the xplorit_owners list check that the current user is the DB Owner/Co Owner

           if(blockEdit === true) {
                let currentUser =  window.getCurrentSPUser()
                const {CoownerEmail, OwnerEmail} = this.props.productOverview

                if((currentUser.user_email).toLowerCase() === (OwnerEmail).toLowerCase() || (currentUser.user_email).toLowerCase() === (CoownerEmail).toLowerCase()) 
                    blockEdit = false;
                else
                    blockEdit = true;
                    
           }


            // ? Set Allow Edition Value for Other Tabs
           sessionStorage.setItem('userCanEdit', !blockEdit);

           

            this.setState({
                blockEdit : blockEdit,
            });
        }


        // --------------------------------------
        // Remove Window Resizing
        // --------------------------------------
        componentWillUnmount() {
            window.removeEventListener("resize", this.updateContainerDimensions);
        }


        // --------------------------------------
        // Window Resizing
        // --------------------------------------
        updateContainerDimensions = () => {
            let newWidth = window.innerWidth;
            this.setState({responsiveWidth : newWidth});
        }


    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */


        // --------------------------------------
        // Format Array of Values
        // --------------------------------------
        // formatMultipleValues(dataArray) {
        //     if(!dataArray || dataArray.length <= 0)
        //         return ""

        //     if(typeof dataArray ===  String)

        //     // ? Convert array into string
        //     const formattedValues =  dataArray.join()
        //     return formattedValues || ""
        // }


        // --------------------------------------
        // Format Values
        // --------------------------------------
        formatDate = (date)=> {
            const productDate = new Date(date);
            return productDate.toLocaleDateString();
        }


        // --------------------------------------
        // Set Format To Owner Name
        // --------------------------------------
        formatOwners = (ownerName) => {
            return startCase(ownerName.toLowerCase())
        }

         

        // --------------------------------------
        // Render OverView Details 
        // --------------------------------------

        renderOverviewDetails(productOverview, editControls) {
            const { 
                OwnerFirstName, OwnerLastName, 
                ProductType, CreatedDate, 
                LastUpdateDate, CoownerFirstName, 
                CoownerLastName  ,
                ShortDescription, 
                CoownerEmail, OwnerEmail
            } = productOverview;
            const {responsiveWidth} = this.state;

            let overViewColumnclassNames = responsiveWidth <= 1280 ? 'col-lg-12 col-md-12 col-sm-12' : 'col-lg-7 col-md-12 col-sm-12';
            let productCardColumnClassNames = responsiveWidth <= 1280 ? 'col-lg-12 col-md-12 col-sm-12' : 'col-lg-5 col-md-12 col-sm-12';
            let longCard = responsiveWidth <= 1280  ? true : false 

            if(responsiveWidth <= 768)
                longCard = false;


            


            return (
               

                <Fragment>
                    <div className="xpl-cardWideHeader ">


                        <div className="container-fluid">


                            <div className="row">

                            
                                    <div className =  {productCardColumnClassNames}>

                                        <h2 style = {{marginBottom:40}}> Product Overview  </h2>


                                        <ProjectCard 
                                            key = {productOverview.partID}
                                            cardHover = {false}  
                                            projectColor = {productOverview.color}
                                            longCard = {longCard}
                                            detailsViewCard = {true}
                                            {...productOverview}
                                        />
                                    </div>

                                         


                                    <div className = {overViewColumnclassNames} >
                                        <div className="row">
                                        

                                        
                                            <div className="xpl-editButtonContainer xpl-editButtonContainerEnd">

                                               
                                                    {
                                                        
                                                        // editControls === false ?
                                                        (this.state.blockEdit === false && editControls === false ) ?
                                                            <SingleButton
                                                                buttonText={"Edit Content"}
                                                                buttonColor={"primary"}
                                                                onClick={this.props.toggleFields}
                                                            />

                                                        :
                                                        (this.state.blockEdit === false && editControls === true ) &&
                                                            <input 
                                                                type="submit" 
                                                                value="Save Content" 
                                                                className = 'xpl-singleButton' 
                                                                name = {'saveContent'}
                                                            />
                                                    }
                                            </div>
                                            
                                            
                                            <FieldItem 
                                                fieldName = {"Product Name"} 
                                                fieldValue = {productOverview.ProductName} 
                                                editField = {false} 
                                                // onChangeInput = {(event) => this.onInputChage(event)}
                                                // onChangeInput = {this.onInputChage}
                                                
                                            />



                                            <FieldItem 
                                                fieldName = {"Functional Category"} 
                                                fieldValue = {productOverview.SoftwareTopic} 
                                                editField = {false}  
                                                renderAsList = {true}
                                            />

                                            
                                            

                                            <FieldItem 
                                                fieldName = {"Vendor"} 
                                                fieldValue = {productOverview.Vendors ||productOverview.Customers} 
                                                editField = {false} 
                                            />



                                            <FieldItem 
                                                fieldName = {"Technical Classification"} 
                                                fieldValue = {productOverview.ProductType} 
                                                editField = {false} 
                                            />

                                        </div>

                                    </div>
                                    

                            </div>

                        </div>

                    </div>


                    <div className="xpl-cardOverviewContainer container-fluid">
                        <h5 className = "xpl-boldText xpl-fieldSeparator" > Product Details </h5>


                            <div className="row">
                                    
                                <div className="col-md-6">

                                    {/*<FieldItem 
                                        fieldName = {"Owner"} 
                                        fieldValue = {this.formatOwners(`${OwnerFirstName} ${OwnerLastName}`)}  
                                        colName = {'col-md-12 col-lg-12'} 
                                    />*/}

                                    <FieldPicker 
                                        fieldName = {"Owner"} 
                                        fieldValue = {OwnerEmail}  
                                        editField = {false} 
                                        inputName = {"Owner"}
                                        colName = {'col-md-12 col-lg-12'}
                                        userName ={this.formatOwners(`${OwnerFirstName} ${OwnerLastName}`)} 
                                        // onPickerChange = {this.onChangeInput}
                                        dynamicPicker = {false}
                                    />
                                 
                                    </div>
                                
                                  
                                    <div className="col-md-6">

                                        <FieldPicker 
                                            fieldName = {"Co-Owner"} 
                                            fieldValue = {CoownerEmail}  
                                            editField = {false} 
                                            inputName = {"Owner"}
                                            colName = {'col-md-12 col-lg-12'}
                                            userName = {this.formatOwners(`${CoownerFirstName} ${CoownerLastName}`)} 
                                            // onPickerChange = {this.onChangeInput}
                                            dynamicPicker = {false}
                                        />

                                     {/*   <FieldItem 
                                            fieldName = {"Co-Owner"} 
                                            fieldValue = {this.formatOwners(`${CoownerFirstName} ${CoownerLastName}`)}  
                                            colName = {'col-md-12 col-lg-12'} 
                                     />*/}
                                        
                                    </div>

                                </div>
                                

                                <div className="row">

                                    <div className="col-md-12 col-lg-12">
                                        <FieldItem 
                                            fieldName = {"Description"} 
                                            fieldValue = {ShortDescription}  
                                            isTextArea = {true} 
                                            editField = {false} 
                                            colName = {'col-md-12 col-lg-12'}
                                            
                                        />
                                    </div>
                                    
                                    
                                    
                                </div>
                             


                           



                            <div className="row" style = {{marginTop : 25}}>
                                
                            
                                <div className="col-md-12">
                                    <FieldRemovableList
                                        fieldName = {"Seach Keywords"} 
                                        listValues = {productOverview.SearchKeyword.split(',')} 
                                        colName = {'col-md-12 col-lg-12'} 
                                        inputName = {'keywordsList'} 
                                        editField = {false} 
                                        
                                    />

                                 
                                </div>
                        
                               
                            </div>

                           

                    </div> 
                </Fragment>
                





            )
        }


        // --------------------------------------
        // Render Overview Editable
        // --------------------------------------

        renderEditableOverview(productOverview, editControls) {
            
            return (<AddProjectForm 
                        productOverview = {productOverview} 
                        editCard = {true} 
                        toggleFields = {this.props.toggleFields} 
                        toggleFieldsAfterUpdate = {this.props.toggleFieldsAfterUpdate}
                        editControls = {this.props.editControls} 
                        updateProject = {this.props.editControls}/>
                    )
        }



        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {

            const {productOverview, editControls} = this.props;

            if(editControls === false)
                return this.renderOverviewDetails(productOverview, editControls);
            else    
                return this.renderEditableOverview(productOverview, editControls)
        }
}

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
CardHeaderWide.propTypes = {
    props: PropTypes
};


// --------------------------------------
// Export Component
// --------------------------------------
export default CardHeaderWide;