/* ==========================================================================
** Color Picker Component
** Using React Color https://casesandberg.github.io/react-color/
** 03/05/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { SketchPicker } from 'react-color';
    import PropTypes from 'prop-types';



// --------------------------------------
// Create Component Class
// --------------------------------------
    class ColorPicker extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    selectedColor: '#fff',
                    displayColorPicker : false
                }
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
           
            handleChangeComplete = (color) => {
                this.setState({ selectedColor: color.hex });
                this.props.handleColorChange(color.hex);
            };


            handleClick = () => {
                this.setState({ displayColorPicker: !this.state.displayColorPicker })
            };
            
            
            handleClose = () => {
                this.setState({ displayColorPicker: false })
            };



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            

            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderColorPicker() {
                const {selectedColor, displayColorPicker} = this.state;
                // const {showColorPicker} = this.props;

                const popover = {
                    position: 'absolute',
                    zIndex: '2',
                }
                  
                const cover = {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                }


                return (

                    displayColorPicker === true ? 
                        <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                                <SketchPicker
                                    color = { selectedColor}
                                    onChangeComplete={ this.handleChangeComplete }
                                /> 
                        </div> 
                    : <button  className="xpl-fieldEditInput" name="cardIcon" value="Show Colors" onClick = {this.handleClick}> Show Colors </button>
                    // <input type="submit" class="xpl-fieldEditInput" name="cardIcon" value="Show Colors" onClick = {this.handleClick} />

                    
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderColorPicker();
            }
    }




// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ColorPicker.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default ColorPicker;