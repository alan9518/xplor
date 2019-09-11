/* ==========================================================================
** Icon Picker Component
** 03/05/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component } from 'react';
    import PropTypes from 'prop-types';
    import axios from 'axios';
    import { AppLoader, IconItem } from '../index'
    import './styles.css';
    import { Endpoints } from '../../services/endpoints';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class IconPicker extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    selectedIcon: props.selectedIcon || '',
                    iconsData : [],
                    isLoaded : false
                }
            
                
            }



            // --------------------------------------
            // Set Initial Values
            // Get Icons
            // --------------------------------------
            async componentDidMount() {
                try {
                    const getIconsPromise = await axios.get(Endpoints.getAllowedProductsIcons);
                    const iconsData =  await getIconsPromise.data;


                    this.setState({
                        iconsData : iconsData.value,
                        isLoaded : true
                    })
                }
                catch(error) {
                    this.setState({
                        iconsData : [],
                        isLoaded : true
                    })
                }
            
            }


            // --------------------------------------
            // Set Selected Icon
            // --------------------------------------

            onIconClick = (event)=> {
                event.preventDefault();
                
                
                const {value} = event.currentTarget;
                
                this.setState({selectedIcon : value})
                
                
                this.props.onIconChange( value || event.target.id);
            }


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader customHeight = {800}/> </div>
            }



            // --------------------------------------
            // Render Projects
            // Iterate Icons && Render Grid
            // --------------------------------------
            renderIconPicker() {
                const {iconsData, selectedIcon} = this.state;
                // let iconSelected =  false;
                console.log("TCL: IconPicker -> renderIconPicker -> selectedIcon", selectedIcon)
                return (
                    <div className = "xpl-iconsGridContainer"> 
                        <div className="row">
                            {
                                iconsData && iconsData.map((icon)=> {
                                    return (
                                        <div className="col-md-2 col-sm-4 col-xs-6">
                                            {   
                                            
                                                
                                                <IconItem iconName = {(icon.icon).toLowerCase()} onIconClick = {this.onIconClick} key = {icon} isSelected = {selectedIcon === icon.icon ? true : false}/> 
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
                
            }

            

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded } = this.state;
                return isLoaded === true ? this.renderIconPicker() : this.renderLoader();
            }
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    IconPicker.propTypes = {
        onIconChange: PropTypes.func
    };

    
// --------------------------------------
// Export Component
// --------------------------------------
    export default IconPicker;