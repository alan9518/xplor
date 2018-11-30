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

// --------------------------------------
// Create Component Class
// --------------------------------------

    const CardHeaderWide = props => {

        const {productOverview} = props;
        const { 
                OwnerFirstName, OwnerLastName, 
                ProductType, CreatedDate, 
                LastUpdateDate, CoownerFirstName, 
                CoownerLastName  
            } = productOverview;
        
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
                        <li> <span className = "xpl-boldText"> Uploaded: </span>  {CreatedDate}</li>
                        <li> <span className = "xpl-boldText"> Owner: </span> {`${OwnerFirstName} ${OwnerLastName}`} </li>
                         
                        
                       </ul>
                    </div>

                    <div className="xpl-cardProjectInfo">
                       <ul>
                        <li> <span className = "xpl-boldText"> Co-Owner: </span> {`${CoownerFirstName} ${CoownerLastName}`} </li>
                        <li> <span className = "xpl-boldText"> ProductType : </span> {ProductType} </li>
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
