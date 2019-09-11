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
    const {path, prodEnpoints} = Config


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
            getAllProducts : `${prodEnpoints}/getProducts`,
            
        // --------------------------------------
        // Get Carrousel Products
        // --------------------------------------
            getCarrouselProducts : `${prodEnpoints}/getCarouselPro`,
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // @param {Bussmodel <String>}
        // --------------------------------------*/
            getAllProductsByCategory: `${prodEnpoints}/getProductsByCategory`,
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // @param {subcap <String>}
        // @param {Bussmodel <String>}
        // @returns {}
        // -------------------------------------- */
            // getAllProductsBySubCategory : `${prodEnpoints}/getProductsBySubcap?customerid=1025&subcap=Analytics&Bussmodel=XPLO`'
            getAllProductsBySubCategory : `${prodEnpoints}/getProductsBySubcap`,
        
        /** --------------------------------------
        // Get All Categories
        // @param {Bussmodel <String>}
        // --------------------------------------**/
            getAllCategories : `${prodEnpoints}/getCategories`,
        
        // --------------------------------------
        // Get Sub Categories
        // --------------------------------------
            getSubCapacities : `${prodEnpoints}/getSubCap`,

        // --------------------------------------
        // Get Vendors (Manufacturer)
        // @param {erpid <string>}
        // --------------------------------------
            getVendors : `${prodEnpoints}/getManufacturer`,
        
        /** --------------------------------------
        // Get Product Details
        // @param {partid <String>}
        // --------------------------------------*/
            getProduct : `${prodEnpoints}/getSingleProduct`,
        
        /** --------------------------------------
        // Get Related Products
        // @param {customerid <String>}
        // @param {keyword <String array>, split by coma}
        // --------------------------------------*/
            getRelatedProducts : `${prodEnpoints}/getRelatedPro`,

            
        /** --------------------------------------
        // Get Related Products
        // @param {customerid <String>}
        // @param {keyword <String array>, split by coma}
        // --------------------------------------*/
            getRelatedProductsHard : `${prodEnpoints}/getRelatedPro?customerid=1014&keyword=MDM,Master%20Data,Reference%20Data,%20GDH`,
        
        /** --------------------------------------
        // Get Product Attributes Tabs
        // @param {partid <String> }
        // --------------------------------------*/
            getProductTabs : `${prodEnpoints}/getTabs`,

        /** --------------------------------------
        // Get Tab Values
        // @param {partid <String>}
        // @param {busstypeid <String>}
        // --------------------------------------*/
            getTabAttributes : `${prodEnpoints}/getTabAttributes`,

        /** --------------------------------------
        // Get Tab Values
        // @param {partid <String>}
        // --------------------------------------*/
            getPartRecord : `${prodEnpoints}/getPartRecord`,

        /** --------------------------------------
        // Get Pro Categories
        // @param {busstypeid <String>}
        // --------------------------------------*/
            getProCategories : `${prodEnpoints}/getProCategory`,


        /** --------------------------------------
         * Check if Prjoject Name Already Exists
        // @param Bussmodel=XPLOR
        // @param productName=PCN
        // @returns {}
        // -------------------------------------- */
            checkRepeatedProjectName : `${prodEnpoints}/doesProductNameExist`,


        /** --------------------------------------
        // Get Products Search
        // @param {Bussmodel=XPLOR <String>}
        // --------------------------------------*/
            getProductSearch : `${prodEnpoints}/getProductSearch`,


        /** --------------------------------------
        // Create New Product
        // @param {busstypeid <String>}
        // --------------------------------------*/
            createNewProject : `${prodEnpoints}/insertNewProduct`,

        /** --------------------------------------
        // Update Product
        // @param {busstypeid <String>}
        // --------------------------------------*/
            updateProject : `${prodEnpoints}/updatePartProject`,


        /** --------------------------------------
        // Create/update New Product Attributes
        // @param {busstypeid <String>}
        // --------------------------------------*/
            updateTabAttributes : `${prodEnpoints}/updateTabAttr`,

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
            getAllowedProductsIcons : `${path}/_api/web/lists/getbyTitle('xplorIT-icons-allowed')/items?$top=1000`,

        /** --------------------------------------
        // Get Owners 
        // @param {listName} 89
        // --------------------------------------*/
            getXplorITOwners : `${path}/_api/web/sitegroups/getbyid(89)/users`
    }