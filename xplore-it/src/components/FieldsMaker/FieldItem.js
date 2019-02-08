/* ==========================================================================
** Field Item Component
** 22/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Check if the Value is a Link
// --------------------------------------
    const isFieldLink = (value) => {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;


        if (regexp.test(value))
            return <a href={value} target="_blank" rel="noopener noreferrer"> {value} </a>
        else
            return <p> {value}  </p>
    }


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldItem = (props) => {

        const { colName, fieldName, fieldValue } = props;

        return (
            <div className={colName}>

                <div className="xpl-fieldItem">

                    <h6 className="xpl-boldText"> {fieldName} </h6>
                    {isFieldLink(fieldValue)}

                </div>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FieldItem.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };


// --------------------------------------
// Default Props
// --------------------------------------
    FieldItem.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldItem;