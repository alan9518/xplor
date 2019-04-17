/* ==========================================================================
** Field List Component
** 22/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldList = (props) => {

        const {colName, fieldName, listValues} = props;

        return (
            <div className = {colName}>

                <div className="xpl-fieldList">

                    <h6 className = "xpl-boldText xpl-fieldSeparator"> {fieldName} </h6> 
                    <ul>
                        {
                            listValues && listValues.map((listItem)=> {
                                return( <li className = "xpl-detailsListItem"> <i className="fas fa-caret-right"></i> {listItem}  </li>)
                            })
                        }
                    </ul>

                </div>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FieldList.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
export default FieldList;