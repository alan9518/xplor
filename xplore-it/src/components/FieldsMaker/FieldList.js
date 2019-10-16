/* ==========================================================================
** Field List Component
** 22/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {CheckList } from '../../components';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldList = (props) => {

        const {colName, fieldName, listValues, editField, posibleValues, index} = props;
		

        return (
            <div className = {colName}>

                <div className="xpl-fieldList">

                    <h6 className = "xpl-boldText xpl-fieldSeparator"> {fieldName} </h6> 

                    {
                        // ? Choose Between Display List or CheckList
                        editField === true 
                        ?  <CheckList listValues = {listValues} onClick = {props.onClick} index = {index}/> 
                        :   <ul>
                                {
                                    listValues && listValues.map((listItem)=> {
                                        if(listItem.isChecked ===  true)
                                            return( <li className = "xpl-detailsListItem"> <i className="fas fa-caret-right"></i> {listItem.name || listItem}  </li>)
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
    FieldList.propTypes = {
        colName : PropTypes.string,
        fieldName : PropTypes.string,
        listValues : PropTypes.array,
        editField : PropTypes.bool,
        posibleValues : PropTypes.array,
        index : PropTypes.number
    };
// --------------------------------------
// Export Component
// --------------------------------------
export default FieldList;