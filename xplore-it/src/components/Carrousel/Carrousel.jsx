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
    import {ProjectCard} from '../index';
    
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
                    arrows : true,
                    speed: 500,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
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
        // Render Carrousel 
        // --------------------------------------
        renderCarrousel() {
            const {carrouselData} = this.props;
            console.log('carrouselData',  this.props);
            return (
                <Slider {...this.settings}>
                {
                    carrouselData.map((carrouselItem,index) => {
                        return  <div  className="col-lg-12 col-md-12 col-sm-12">
                           <ProjectCard key = {`car-${index}.${carrouselItem.partID}`} {...carrouselItem}/>
                        </div>
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
    // Carrousel.propTypes = {
    //     prop: PropTypes
    // };

// --------------------------------------
// Export Component
// --------------------------------------
    export default Carrousel;
;