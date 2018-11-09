/* ==========================================================================
 * Custom LitgthBox Copmponent  
 * 08/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import { Modal, OverlayTrigger, Tooltip , Popover, Button } from 'react-bootstrap';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class AppModal extends Component {

        // --------------------------------------
        // Constructor
        // --------------------------------------
            constructor(props) {
                super(props);
                console.log('props', props);
                this.state = {
                    isOpen : this.props.isOpen
                }
            }


        // --------------------------------------
        // Open Modal
        // --------------------------------------
            handleModalState = (e) => {
                const {isOpen} = this.state;
                this.setState({
                    isOpen : "true",
                });
            }


        // --------------------------------------
        // Close Modal
        // --------------------------------------
        handleModalClose= (e) => {
            const {isOpen} = this.state;
            this.setState({
                isOpen : "false",
            });
        }



        // --------------------------------------
        // Render Modal
        // --------------------------------------
        renderModal() {
            const {isOpen} = this.props;
            console.log('isOpen', isOpen);

            const popover = (
                <Popover id="modal-popover" title="popover">
                  very popover. such engagement
                </Popover>
              );
              
              const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

            return (
                


                <Modal show={isOpen} >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>

                        <h4>Popover in a modal</h4>
                        <p>
                        there is a{' '}
                        <OverlayTrigger overlay={popover}>
                            <a href="#popover">popover</a>
                        </OverlayTrigger>{' '}
                        here
                        </p>

                        <h4>Tooltips in a modal</h4>
                        <p>
                        there is a{' '}
                        <OverlayTrigger overlay={tooltip}>
                            <a href="#tooltip">tooltip</a>
                        </OverlayTrigger>{' '}
                        here
                        </p>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>
            )
        }

        

        // --------------------------------------
        // Render Component
        // --------------------------------------
            render() {
                const {isOpen, } = this.props;
                return (
                    isOpen === true ? this.renderModal() : null
                    // isOpen === false && this.renderModal()
                )
            }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    // AppModal.propTypes = {
    // prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default AppModal;
