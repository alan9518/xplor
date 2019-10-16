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
        const {listValues, index} = props;
        return (
            <div className = 'xpl-checkListContainer'>
                {
                    listValues && listValues.map((item)=> {
                        const {name} =  item;
                        let nameToCheck = name.replace(/\s+/g, '')
                        if(nameToCheck !== "" || nameToCheck.length > 0)
                            return <CheckBox id= { item.name } label = {item.name}  value = {item.value} isChecked = {item.isChecked} onClick = { props.onClick} index = {index}/>
                        else 
                            return null
                    })

                    
                }
                
            
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    CheckList.propTypes = {
        listValues: PropTypes.array,
        index : PropTypes.number
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default CheckList;