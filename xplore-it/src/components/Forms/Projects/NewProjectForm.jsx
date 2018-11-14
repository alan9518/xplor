/* ==========================================================================
 * New Project Form 
 * 12/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component }  from 'react'
    import PropTypes from 'prop-types';
    import {MaterialButton, AppButton} from '../../../components';



// --------------------------------------
// Create Component Class
// --------------------------------------
    class NewProjectForm extends Component {


        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                produtName : '',
                productKeywords : [],
                productDescription : '',
                productCategory : '',
                productSubCategory : [],
                specialPermission : '',
                newCategoryAdded : false,
                specialPermissionAdded : false
            }
            
        }

        // --------------------------------------
        // Add new Category
        // --------------------------------------
            toggleNewCategoryInput = (e) => {
                e.preventDefault();
                const {newCategoryAdded} = this.state;
                this.setState({
                    newCategoryAdded : !newCategoryAdded
                })
            }

        
        // --------------------------------------
        // Add new Category
        // --------------------------------------
            toggleSpecialPermission = (e) => {
                // e.preventDefault();
                const {specialPermissionAdded} = this.state;
                const value = e.target.value;
                console.log('value', value);

                this.setState((prevstate) => {
                    return {
                        specialPermissionAdded : !prevstate.specialPermissionAdded
                    }
                })
            }



        // --------------------------------------
        // Render Form
        // --------------------------------------
            renderFormBody() {
                const {newCategoryAdded , specialPermissionAdded } = this.state;
                console.log('specialPermissionAdded', specialPermissionAdded);
                return (
                    <div className="xpl-newProjectContainer container-fluid">

                    <form method = "POST" action = "#">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="newProjectName"> Product Name </label>
                                    <input type="text" className="form-control" id="newProjectName" name="newProjectName" aria-describedby="newProjectName"
                                        placeholder="Enter Name " />
                
                                </div>
                
                                <div className="form-group">
                                    <label htmlFor="newProjectKeyWords"> Product Keywords </label>
                                    <textarea className="form-control" rows="3" id="newProjectKeyWords" name="newProjectKeyWords "
                                        placeholder="This help search your product"></textarea>
                
                                </div>
                
                                <div className="form-group">
                                    <label htmlFor="newProjectDesc"> Product Description </label>
                                    <textarea className="form-control" rows="4" id="newProjectDesc" name="newProjectDesc " placeholder="Max 300 Characters"></textarea>
                
                                </div>
                
                
                            </div>
                
                
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <label htmlFor="newProjectDesc"> What Category should it be listed under? </label>
                
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                
                                    </div>
                                    <div className="col-md-7 xpl-newCatButton">
                                            <AppButton 
                                                buttonText = {"Add Another (optional) Category"} 
                                                iconLeftClass = {'fas fa-plus-circle'} 
                                                onClick = {this.toggleNewCategoryInput}
                                            />
                                    {
                                        newCategoryAdded &&  <input type="text" class = "form-control" placeholder />
                                    }
                                    </div>
                                
                                </div>
                
                
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect2">Select SubCategory</label>
                                            <select multiple className="form-control" id="exampleFormControlSelect2">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                
                                    <div className="col-md-6"></div>
                
                                </div>
                
                                <div className="radios-group">

                                 <label htmlFor=""> Does this product require a special permission?</label>
                
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="permissionRadio" 
                                            id="permissionRadioNo" 
                                            value = {false}
                                            checked = {this.state.specialPermissionAdded === false}
                                            onChange = {this.toggleSpecialPermission}
                                        />
                                        
                                        <label className="form-check-label" htmlFor="permissionRadioNo">
                                            No
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <div className="row">
                                            <div className="col-md-1" style={{marginTop:'5px'}}>
                                                <input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    name="permissionRadio" 
                                                    id="permissionRadioYes"
                                                    value = {true} 
                                                    checked = {this.state.specialPermissionAdded === true}
                                                    onChange = {this.toggleSpecialPermission}
                                                />
                                            
                                                <label className="form-check-label" htmlFor="permissionRadioYes">
                                                    Yes
                                                </label>
                                            </div>
                    
                                            {
                                                specialPermissionAdded && 
                                                <div className="col-md-11">
                                                    <input type="text" className="form-control" id="permissionContact" name="permissionContact"
                                                    aria-describedby="permissionContact" placeholder="email or url of contact to get accesss permissions" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                
                                {this.renderFormButtons()}
                
                
                            </div>
                
                
                
                        </div>
                    </form>
                
                </div>
                )
            }


        // --------------------------------------
        // render Form Buttons
        // --------------------------------------
            renderFormButtons() {
                return (
                    <div className="xpl-formSubmitContainer">
                        <MaterialButton 
                            buttonText = {"Add"}
                            buttonColor= {"primary"} />
                        <MaterialButton
                            buttonText = {"Cancel"}
                            buttonColor = {"secondary"}/>
                    </div>
                )
            }

        // --------------------------------------
        // Render Component
        // --------------------------------------
            render() {
                return (
                    this.renderFormBody()
                )
            }
    }


// --------------------------------------
// Define PropTypes
// --------------------------------------
    // NewProjectForm.propTypes = {
    // prop: PropTypes
    // }


// --------------------------------------
// Export Component
// --------------------------------------
    export default NewProjectForm; 