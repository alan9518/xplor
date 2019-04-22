/* ==========================================================================
** CheckList Component COntainer
** 22/04/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {CheckBox} from '../../components';
    import PropTypes from 'prop-types';
// --------------------------------------
// Create Functional Component
// --------------------------------------
const CheckList = (props) => {
    const {listValues} = props;
    return (
        <div className = 'xpl-checkListContainer'>
            {
                listValues && listValues.map((item)=> {
                    return <CheckBox id= { item } label = {item}  value = {item} isChecked = {true} />
                })
            }
            
           
        </div>
    )
}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
CheckList.propTypes = {
    props: PropTypes
};
// --------------------------------------
// Export Component
// --------------------------------------
export default CheckList;