/* ==========================================================================
** Removable Items Field List Compoentn
** 31/05/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
// --------------------------------------
// Create Functional Component
// <i className="fas fa-close" onClick = {(event) => { console.log('delete item' , listItem)  }}> </i>
// --------------------------------------
const FieldRemovableList = (props) => {

    const {colName, fieldName, listValues, editField, posibleValues, onClick } = props;
    
    return (
        <div className = {colName}>

            <div className="xpl-fieldList">

                <h6 className = "xpl-boldText xpl-fieldSeparator"> {fieldName} </h6> 

                {
                    // ? Choose Between Display List or CheckList
                    // <i className="fas fa-caret-right"> </i>
                     <ul>
                            {
                                listValues && listValues.map((listItem)=> {
                                    return( 
                                            <li className = "xpl-keyWordListItem"> 
                                                {
                                                    !editField  && <i className="fas fa-caret-right"> </i>
                                                }
                                                <span> {listItem}   </span>
                                                {
                                                    editField && <i className="fas fa-times" onClick = { (event) => {onClick(listItem)}}> </i>
                                                }
                                                
                                            </li>
                                        )
                                })
                            }
                        </ul>

                }
                


               

            </div>
        </div>
    )
}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
FieldRemovableList.propTypes = {
    props: PropTypes
};
// --------------------------------------
// Export Component
// --------------------------------------
export default FieldRemovableList;