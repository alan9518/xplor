/* ==========================================================================
** Field Color Container
** 03/05/2019
** Alan Medina Silva
** ========================================================================== */



// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import ColorPicker from '../ColorPicker/ColorPicker';



// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FieldColor = (props) => {
        const { colName, fieldName  } = props;
        return (
            <div className={colName}>

                <div className="xpl-fieldItem" >

                    <h6 className="xpl-boldText xpl-fieldSeparator"> {fieldName} </h6>

                    <ColorPicker handleColorChange = {props.onColorChange}/>

                </div>
            </div>
        )
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    FieldColor.propTypes = {
        colName: PropTypes.string,
        fieldName: PropTypes.string,
        fieldValue: PropTypes.string
    };

// --------------------------------------
// Default Props
// --------------------------------------
    FieldColor.defaultProps = {
        colName:  'col-xl-6 col-lg-6 col-sm-12 col-xs-12'
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default FieldColor;