/* ==========================================================================
 * New Project Form 
 * 12/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component, Fragment }  from 'react'
    // import PropTypes from 'prop-types';
    import {MaterialButton, AppButton, SingleSelect, MultipleSelect} from '../../../components';




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
                productKeywords : [
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' }
                ],
                productDescription : '',
                productCategory : '',
                productSubCategory : [],
                specialPermission : '',
                newCategoryAdded : false,
                specialPermissionAdded : false,
                categories : [
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' }
                ],
            }
            
        }


     /* ==========================================================================
      * State and Logic Functions
        ========================================================================== */    

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
                // const value = e.target.value;

                this.setState((prevstate) => {
                    return {
                        specialPermissionAdded : !prevstate.specialPermissionAdded
                    }
                })
            }


        // --------------------------------------
        // Add New Category to State
        // --------------------------------------
            addNewCategoryToState = (e) => {
                e.preventDefault();
                const newCategory = document.querySelector('#newCategoryInput').value;
                this.setState({
                    productCategory : newCategory
                })
                
            }


        // --------------------------------------
        // Reset Form
        // --------------------------------------
            resetForm = (e) => {
                e.preventDefault();
                this.setState({
                    produtName : '',
                    productKeywords : [],
                    productDescription : '',
                    productCategory : '',
                    productSubCategory : [],
                    specialPermission : '',
                    newCategoryAdded : false,
                    specialPermissionAdded : false,
                })
            }


        // --------------------------------------
        // Handle Form Text Input Changes
        // --------------------------------------
            handleTextChange = (e)=> {
                
                this.setState({
                    [e.target.name] : e.target.value
                });

                
            }


    /* ==========================================================================
     *  DB Functions
     ========================================================================== */  
        
    
        // --------------------------------------
        // Submit form Data To API
        // --------------------------------------
            submitNewProduct = (e) => {
                e.preventDefault();
            }
        



    /* ==========================================================================
     *  Render Functions
     ========================================================================== */        

        // --------------------------------------
        // Render New Category Form
        // --------------------------------------
        renderNewCategoryInput() {
            return (
                <Fragment>
                        <div className="col-md-10">
                            <div className="form-group">
                                <input type="text"  id = "newCategoryInput" className = "form-control" placeholder = "Add New Category" />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <MaterialButton 
                                buttonText = {"Add"}
                                buttonColor= {"primary"} 
                                onClick = {this.addNewCategoryToState}
                            />
                        </div>
                </Fragment>
            )
        }

        // --------------------------------------
        // Render Special Persmission User Mail
        // --------------------------------------
        renderSpecialPermissionsInputs() {
            return (
                <div className="col-md-11">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="permissionContact" 
                        name="permissionContact"
                        aria-describedby="permissionContact" 
                        placeholder="email or url of contact to get accesss permissions" 
                    />
                </div>
            )
        }


        // --------------------------------------
        // Render Form
        // --------------------------------------
            renderFormBody() {
                const {newCategoryAdded , specialPermissionAdded } = this.state;
                return (
                    <div className="xpl-newProjectContainer container-fluid">

                    <form method = "POST" onSubmit = {this.submitNewProduct}>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="produtName"> Product Name </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="produtName" 
                                        name="produtName" 
                                        aria-describedby="produtName"
                                        placeholder="Enter Name " 
                                        onChange = {this.handleTextChange}
                                    />
                
                                </div>
                
                                <div className="form-group">
                                    <label htmlFor="newProjectKeyWords"> Product Keywords </label>
                                

                                    <MultipleSelect
                                            isClearable={true}
                                            key = {'keywordsSelect'}
                                            isSearchable={true}
                                            options={this.state.productKeywords}
                                    />
                
                                </div>
                
                                <div className="form-group">
                                    <label htmlFor="productDescription"> Product Description </label>
                                    <textarea 
                                        className="form-control" 
                                        rows="4" 
                                        id="productDescription" 
                                        name="productDescription" 
                                        placeholder="Max 300 Characters"
                                        onChange = {this.handleTextChange}>
                                    </textarea>
                
                                </div>
                
                
                            </div>
                
                
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <label> What Category should it be listed under? </label>
                
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-group">

                                            <SingleSelect
                                                isClearable={false}
                                                isSearchable={true}
                                                options={this.state.categories}
                                            />
                                        </div>
                
                                    </div>
                                    <div className="col-md-7 xpl-newCatButton">
                                            <AppButton 
                                                buttonText = {"Add Another (optional) Category"} 
                                                iconLeftClass = {'fas fa-plus-circle'} 
                                                onClick = {this.toggleNewCategoryInput}
                                            />
                                    
                                    </div>
                                        {newCategoryAdded &&  this.renderNewCategoryInput()}
                                </div>
                
                
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect2">Select SubCategory</label>

                                            <MultipleSelect
                                                isClearable={true}
                                                key = {'subCategoriesSelect'}
                                                isSearchable={true}
                                                options={this.state.categories}
                                                defaultValue={this.state.categories[1]}
                                            />

                                        </div>
                                    </div>
                            
                
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
                    
                                            {specialPermissionAdded && this.renderSpecialPermissionsInputs()}
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
                            isSubmit =  {true}
                            buttonColor= {"primary"} />
                        <MaterialButton
                            buttonText = {"Cancel"}
                            buttonColor = {"secondary"} 
                            onClick = {this.resetForm}/>
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