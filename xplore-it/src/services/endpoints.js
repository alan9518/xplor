/* ==========================================================================
 * Endopoints Address File 
 * 28/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
    import {Config} from '../Config';

// --------------------------------------
// Path Route
// --------------------------------------
    const {path} = Config


// --------------------------------------
// Create Endpoints Object
// --------------------------------------
    export const Endpoints = {
        // --------------------------------------
        // Get All Products
        // --------------------------------------
            getAllProducts : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProducts',
        // --------------------------------------
        // Get Carrousel Products
        // --------------------------------------
            getCarrouselProducts : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getCarouselPro',
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // --------------------------------------*/
            getAllProductsByCategory: 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProductsByCategory',
        
        // --------------------------------------
        // Get All Categories
        // --------------------------------------
            getAllCategories : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getCategories',
        
        // --------------------------------------
        // Get Sub Categories
        // --------------------------------------
            getSubCapacities : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getSubCap',
        
        /** --------------------------------------
        // Get Product Details
        // @param {partid <String>}
        // --------------------------------------*/
            getProduct : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getSingleProduct',
        
        /** --------------------------------------
        // Get Related Products
        // @param {customerid <String>}
        // @param {keyword <String array>, split by coma}
        // --------------------------------------*/
            getRelatedProducts : `https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getRelatedPro`,

        /** --------------------------------------
        // Get Sharepoint Categories
        // @param {}
        // --------------------------------------*/
            getSideBarCategoriesSP : `${path}/_api/web/lists/getbyTitle('xplorIT-colors')/items`,
    }