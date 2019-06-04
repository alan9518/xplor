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

    /* ==========================================================================
     *  WebService EndPoints
     ========================================================================== */
        // --------------------------------------
        // Get All Products
        // @param Bussmodel=XPLOR
        // --------------------------------------
            getAllProducts : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProducts',
            
        // --------------------------------------
        // Get Carrousel Products
        // --------------------------------------
            getCarrouselProducts : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getCarouselPro',
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // @param {Bussmodel <String>}
        // --------------------------------------*/
            getAllProductsByCategory: 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProductsByCategory',
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // @param {subcap <String>}
        // @param {Bussmodel <String>}
        // @returns {}
        // -------------------------------------- */
            // getAllProductsBySubCategory : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProductsBySubcap?customerid=1025&subcap=Analytics&Bussmodel=XPLOR'
            getAllProductsBySubCategory : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProductsBySubcap',
        
        /** --------------------------------------
        // Get All Categories
        // @param {Bussmodel <String>}
        // --------------------------------------**/
            getAllCategories : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getCategories',
        
        // --------------------------------------
        // Get Sub Categories
        // --------------------------------------
            getSubCapacities : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getSubCap',

        // --------------------------------------
        // Get Vendors (Manufacturer)
        // @param {erpid <string>}
        // --------------------------------------
            getVendors : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getMaufacturer',
        
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
        // Get Related Products
        // @param {customerid <String>}
        // @param {keyword <String array>, split by coma}
        // --------------------------------------*/
            getRelatedProductsHard : `https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getRelatedPro?customerid=1014&keyword=MDM,Master%20Data,Reference%20Data,%20GDH`,
        
        /** --------------------------------------
        // Get Product Attributes Tabs
        // @param {partid <String> }
        // --------------------------------------*/
            getProductTabs : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getTabs',

        /** --------------------------------------
        // Get Tab Values
        // @param {partid <String>}
        // @param {busstypeid <String>}
        // --------------------------------------*/
            getTabAttributes : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getTabAttributes',

        /** --------------------------------------
        // Get Pro Categories
        // @param {busstypeid <String>}
        // --------------------------------------*/
            getProCategories : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProCategory',

    /* ==========================================================================
     *  Sharepoint EndPoints
     ========================================================================== */
        /** --------------------------------------
        // Get Sharepoint Categories
        // @param {listName}
        // --------------------------------------*/
            getSideBarCategoriesSP : `${path}/_api/web/lists/getbyTitle('xplorIT-colors')/items`,

        /** --------------------------------------
        // Get Sharepoint Categories
        // @param {listName}
        // --------------------------------------*/
            getproductsIcons : `${path}/_api/web/lists/getbyTitle('xplorIT-icons')/items`,

        /** --------------------------------------
        // Get Products Icons
        // @param {listName}
        // --------------------------------------*/
            getAllowedProductsIcons : `${path}/_api/web/lists/getbyTitle('xplorIT-icons-allowed')/items`,
    }