/* ==========================================================================
 ** Field Date Component
 ** 22/01/2019
 ** Alan Medina Silva
 ** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {DatePicker} from '../index';
    import moment from 'moment';
    import PropTypes from 'prop-types';



// --------------------------------------
// Create Functional Component
// --------------------------------------
const FieldDate = (props) => {
    const { colName, fieldName , editField , inputValue,  index } = props;
    return (
        <div className={colName}>

            <div className="xpl-fieldItem">

                <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>
                {editField === true
                    ? <DatePicker
                        name={fieldName}
                        onDateChange = {props.onDateChange}
                        initialValue = {inputValue}
                        editField = {editField}
                        readOnly = {false}
                        index = {index}
                    />
                    : <p> { inputValue !== "" && moment(inputValue).format("MM/DD/YYYY")}  </p>
                }



            </div>
        </div>
    )
}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FieldDate.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };


    // --------------------------------------
    // Default Props
    // --------------------------------------
    FieldDate.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };
// --------------------------------------
// Export Component
// --------------------------------------
export default FieldDate;