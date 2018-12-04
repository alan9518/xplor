/* ==========================================================================
 * Header Of Wide Card
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React  from "react";
    import PropTypes from "prop-types";
    import { ProjectCard } from "../../components";
    import "./styles.css";
    import ListItem from "./CardHeaderListItem";
    import {shuffle, startCase, replace} from "lodash";
// --------------------------------------
// Create Component Class
// --------------------------------------

    const CardHeaderWide = props => {

        // --------------------------------------
        // Get Values
        // --------------------------------------
        const {productOverview} = props;
        const { 
                OwnerFirstName, OwnerLastName, 
                ProductType, CreatedDate, 
                LastUpdateDate, CoownerFirstName, 
                CoownerLastName  
            } = productOverview;

        // --------------------------------------
        // Format Values
        // --------------------------------------
         const formatDate = (date)=> {
                const productDate = new Date(date);
                return productDate.toLocaleDateString();
            }

        const formatOwners = (ownerName) => {
            return startCase(ownerName.toLowerCase())
        }
        
        // --------------------------------------
        // Render Card
        // --------------------------------------
            return (
                <div className="xpl-cardWideHeader">
                    <div className="xpl-cardHeader">
                        <ProjectCard key = {productOverview.partID} {...productOverview} cardHover = {false}/>
                    </div> 

                    <div className="xpl-cardProjectInfo">
                        <ul>    
                            <ListItem itemName = {"Uploaded"} content = {formatDate(CreatedDate)} />
                            <ListItem itemName = {"Product Type"} content = {ProductType} />
                       </ul>
                    </div>

                    <div className="xpl-cardProjectInfo">
                        <ul>
                            <ListItem itemName = {"Owner"} content = {formatOwners(`${OwnerFirstName} ${OwnerLastName}`)}/>
                            <ListItem itemName = {"Co-Owner"} content = {formatOwners(`${CoownerFirstName} ${CoownerLastName}`)} />
                       </ul>
                    </div>
                </div>

                
            );
    };

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // CardHeaderWide.propTypes = {
    //     prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default CardHeaderWide;
