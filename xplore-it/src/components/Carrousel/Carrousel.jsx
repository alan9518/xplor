/* ==========================================================================
 * Carrousel Component Using React Slick
 * 30/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import 'slick-carousel/slick/slick.css';
    import 'slick-carousel/slick/slick-theme.css';
    import './styles.css';
    import Slider from 'react-slick';
    import { ProjectCard } from '../index';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Carrousel extends Component {


        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.settings = {
                dots: true,
                infinite: true,
                arrows: true,
                speed: 500,
                // slidesToShow: this.props.itemsToShow - 1,
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            // slidesToShow: this.props.itemsToShow,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]

            }
        }


        // --------------------------------------
        // Create Carrousel Item
        // Check The Lenght to Determin the Look 
        // Of the Card
        // --------------------------------------
        createCarrouselItem(carrouselItem, index, itemsToShow) {
			console.log('​Carrousel -> createCarrouselItem -> carrouselItem', carrouselItem)
            return (
                <div key={index} className={`col-lg-12 col-md-12 col-sm-12 ${itemsToShow <= 3 && 'xpl-cardStyleCenter'}`} >
                    {/* <ProjectCard  {...carrouselItem} /> */}

                    <ProjectCard                     
                        projectColor = {carrouselItem.color}
                        {...carrouselItem}/>
                </div>
            )
        }


        // --------------------------------------
        // Render Carrousel 
        // --------------------------------------
        renderCarrousel() {
            const { carrouselData, itemsToShow } = this.props;
            return (
                <Slider {...this.settings}>
                    {
                        carrouselData && carrouselData.map((carrouselItem, index) => {
                            return (
                                this.createCarrouselItem(carrouselItem, index, itemsToShow)
                            )
                        })
                    }
                </Slider>
            )
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            return this.renderCarrousel();
        }
    }

// --------------------------------------
// Define PropTypes
// --------------------------------------
    Carrousel.propTypes = {
        carrouselData: PropTypes.array,
        itemsToShow: PropTypes.number
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default Carrousel;
