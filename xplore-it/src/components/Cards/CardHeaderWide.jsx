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
    import { ProjectCard , FieldItem, SingleButton, AddProjectForm, FieldRemovableList, FieldList} from "../../components";
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
                    isLoaded: false,
                }
            }


          


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


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

                } = productOverview;
                return (
                   

                    <Fragment>
                        <div className="xpl-cardWideHeader ">
    
    
                            <div className="container-fluid">
    
    
                                <div className="row">
    
                                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                                            <ProjectCard 
                                                key = {productOverview.partID}
                                                cardHover = {false}  
                                                projectColor = {productOverview.color}
                                                {...productOverview}
                                            />
                                        </div>

                                             
    
    
                                        <div className="col-xl-7 col-lg-7 col-md-12">
                                            <div className="row">

                                            
                                                <div className="xpl-editButtonContainer">

                                                    <h2> Product Overview  </h2>

                                                        {
                                                            editControls === false ?
                                                                <SingleButton
                                                                    buttonText={"Edit Content"}
                                                                    buttonColor={"primary"}
                                                                    onClick={this.props.toggleFields}
                                                                />

                                                            :

                                                            <input type="submit" value="Save Content" className = 'xpl-singleButton' name = {'saveContent'}/>
                                                        }
                                                </div>
                                                
                                                
                                                <FieldItem 
                                                    fieldName = {"Project Name"} 
                                                    fieldValue = {productOverview.ProductName} 
                                                    editField = {false} 
                                                    // onChangeInput = {(event) => this.onInputChage(event)}
                                                    // onChangeInput = {this.onInputChage}
                                                    
                                                />



                                                <FieldItem 
                                                    fieldName = {"Software Topic"} 
                                                    fieldValue = {productOverview.SoftwareTopic} 
                                                    editField = {false} 
                                                    
                                                    
                                                />

                                                
                                                

                                                <FieldItem 
                                                    fieldName = {"Vendor"} 
                                                    fieldValue = {productOverview.Vendors ||productOverview.Customers} 
                                                    editField = {false} 
                                                />



                                                <FieldItem 
                                                    fieldName = {"Product Categories"} 
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

                                        <FieldItem 
                                            fieldName = {"Owner"} 
                                            fieldValue = {this.formatOwners(`${OwnerFirstName} ${OwnerLastName}`)}  
                                            colName = {'col-md-12 col-lg-12'} 
                                        />
                                     
                                        </div>
                                    
                                      
                                        <div className="col-md-6">


                                            <FieldItem 
                                                fieldName = {"Co-Owner"} 
                                                fieldValue = {this.formatOwners(`${CoownerFirstName} ${CoownerLastName}`)}  
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

                               

                        </div> 
                    </Fragment>
                    





                )
            }


            // --------------------------------------
            // Render Overview Editable
            // --------------------------------------

            renderEditableOverview(productOverview, editControls) {
                return <AddProjectForm productOverview = {productOverview} editCard = {true} toggleFields = {this.props.toggleFields} editControls = {this.props.editControls}/>
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