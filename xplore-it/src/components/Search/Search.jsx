/* ==========================================================================
 * App Searchn Input Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment }  from 'react'
    import PropTypes from 'prop-types'



// --------------------------------------
// Create Component Class
// --------------------------------------
    class Search extends Component {


        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return (
                <Fragment>
                    <div className="xpl-searchContainer">
                        <div class="input-group">
                            <input class="form-control py-2 border-right-0 border" type="search" placeholder="Search By Keywords" id="xpl-searchInput"/>
                            <span class="input-group-append">
                                <div class="input-group-text bg-transparent">
                                    <i class="fa fa-search"></i>
                                </div>
                            </span>
                        </div>
                    </div>
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