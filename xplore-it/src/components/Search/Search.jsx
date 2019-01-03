/* ==========================================================================
 * App Searchn Input Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment }  from 'react'
    // import PropTypes from 'prop-types'
    import {SingleSelect} from '../../components'


// --------------------------------------
// Create Component Class
// --------------------------------------
    class Search extends Component {


        // --------------------------------------
        // constructor
        // --------------------------------------\
        constructor(props) {
            super(props);
            this.state = {
                currentCategory : 'All Apps',
                isLoaded : false,
                categoryColor : '',
                products : [],
            }
        }


        // --------------------------------------
        // Initial Shuffle
        // --------------------------------------
        // componentDidMount() {
        //     // this.setState({isLoaded : false})
        //     this.loadProjects()
        // }


        /* ==========================================================================
         *  API Calls
         ========================================================================== */

        

        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {

            const options = [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ]

            return (
                <Fragment>
                        <SingleSelect
                            isClearable={true}
                            isSearchable={true}
                            options={options}
                        />
                </Fragment>
            )
        }
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    // Search.propTypes = {
    // prop: PropTypes
    // }


// --------------------------------------
// Export Component
// --------------------------------------
    export default Search; 