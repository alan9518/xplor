/* ==========================================================================
 * Endopoints Address File 
 * 28/11/2018
 * Alan Medina Silva
 ========================================================================== */

export const Endpoints = {
    getAllProducts : 'https://spapps.flex.com/wsxplorit/xploreitservices.asmx/getProducts',
    getAllCategories : 'http://sacnt2034.americas.ad.flextronics.com/wsxplorit/xploreitservices.asmx/getCategories',
    getProdcut : 'http://sacnt2034.americas.ad.flextronics.com/wsxplorit/xploreitservices.asmx/getSingleProduct?partid={partid}',
    getAllProductsByCategory: 'http://sacnt2034.americas.ad.flextronics.com/wsxplorit/xploreitservices.asmx/getProductsByCategory?customerid='
    
}