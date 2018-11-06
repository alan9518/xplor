/* ==========================================================================
 * React Hook For Get The Window Width on Changes 
 * 06/11/2018
 * Alan Medina Silva
 ========================================================================== */


    // --------------------------------------
    // Get Dependences
    // -------------------------------------
        import { useState, useEffect } from 'react';

        
    // --------------------------------------
    // Create Hook
    // --------------------------------------
    function useWindowWidth () {
        const [width , setWidth ] = useState(window.innerWidth);

        useEffect(()=> {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        });


        return width;

    }
