/* ==========================================================================
 * Header Of Wide Card
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React , {Fragment} from "react";
    import PropTypes from "prop-types";
    import { ProjectCard , FieldItem, SingleButton} from "../../components";
    import "./styles.css";
    // import ListItem from "./CardHeaderListItem";
    // import {  } from '../../components'
    import { startCase} from "lodash";
// --------------------------------------
// Create Component Class
// --------------------------------------

    const CardHeaderWide = (props) => {

    
        // --------------------------------------
        // Get Values
        // --------------------------------------
        const {productOverview, editControls} = props;
        const { 
                OwnerFirstName, OwnerLastName, 
                ProductType, CreatedDate, 
                LastUpdateDate, CoownerFirstName, 
                CoownerLastName  ,
                ShortDescription, 
                
            } = productOverview;

            // console.log("TCL: CardHeaderWide -> editControls", editControls)

        // --------------------------------------
        // Format Values
        // --------------------------------------
        const formatDate = (date)=> {
            const productDate = new Date(date);
            return productDate.toLocaleDateString();
        }


        // --------------------------------------
        // Set Format To Owner Name
        // --------------------------------------
        const formatOwners = (ownerName) => {
            return startCase(ownerName.toLowerCase())
        }



        // --------------------------------------
        // Render OverView Details 
        // --------------------------------------

        renderOverviewDetails() {
            
        }


        // --------------------------------------
        // Render Overview Editable
        // --------------------------------------

        
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <Fragment>
                    <div className="xpl-cardWideHeader ">


                        <div className="container">


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

                                        <div className="xpl-editButtonContainer">

                                            <h2> Product Overview  </h2>

                                                {
                                                    editControls === false ?
                                                        <SingleButton
                                                            buttonText={"Edit Content"}
                                                            buttonColor={"primary"}
                                                            onClick={props.toggleFields}
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


                                        <div className="row">
                                            <FieldItem fieldName = {"Uploaded"} fieldValue = {formatDate(CreatedDate)}  />
                                            <FieldItem fieldName = {"Owner"} fieldValue = {formatOwners(`${OwnerFirstName} ${OwnerLastName}`)}  />
                                            <FieldItem fieldName = {"Last Update"} fieldValue = {formatDate(LastUpdateDate)}  />
                                            <FieldItem fieldName = {"Co-Owner"} fieldValue = {formatOwners(`${CoownerFirstName} ${CoownerLastName}`)}  />
                                            {/* <FieldItem fieldName = {"Product Type"} fieldValue = {ProductType}  /> */}
                                        </div>
                                    </div>
                                    

                            </div>
                        </div>

                    </div>


                    <div className="xpl-cardOverviewContainer">
                        <h5 className = "xpl-boldText xpl-fieldSeparator" > Description  </h5>
                        <p className="xpl-cardProjectCardOverview" >
                            {ShortDescription}
                        </p>
                    </div> 
                </Fragment>
                
            );
    };

// --------------------------------------
// Define PropTypes
// --------------------------------------
    CardHeaderWide.propTypes = {
        productOverview: PropTypes.object
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default CardHeaderWide;
