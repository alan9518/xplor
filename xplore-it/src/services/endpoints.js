/* ==========================================================================
 * Endopoints Address File 
 * 28/11/2018
 * Alan Medina Silva
 ========================================================================== */

export const Endpoints = {
    // --------------------------------------
    // Get All Products
    // --------------------------------------
        getAllProducts : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProducts',
    /** --------------------------------------
    // Get Products By Category
    // @param {customerid <String>}
    // --------------------------------------*/
        getAllProductsByCategory: 'http://sacnt2034.americas.ad.flextronics.com/wsxplorit/xploreitservices.asmx/getProductsByCategory',
    // --------------------------------------
    // Get All Categories
    // --------------------------------------
        getAllCategories : 'http://sacnt2034.americas.ad.flextronics.com/wsxplorit/xploreitservices.asmx/getCategories',
    // --------------------------------------
    // Get Sub Categories
    // --------------------------------------
        getSubCapacities : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getSubCap',
    /** --------------------------------------
    // Get Product Details
    // @param {partid <String>}
    // --------------------------------------*/
        getProduct : 'http://sacnt2034.americas.ad.flextronics.com/wsxplorit/xploreitservices.asmx/getSingleProduct',
    /** --------------------------------------
    // Get Related Products
    // @param {customerid <String>}
    // @param {keyword <String array>, split by coma}
    // --------------------------------------*/
        getRelatedProducts : `https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getRelatedPro`
}