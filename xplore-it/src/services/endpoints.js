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
    const {path, prodEnpoints, debugEndPoints, ownersSPGroup} = Config

    const apiPath = prodEnpoints;
    // const apiPath = debugEndPoints;

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
            getAllProducts : `${apiPath}/getProducts`,
            
        // --------------------------------------
        // Get Carrousel Products
        // --------------------------------------
            getCarrouselProducts : `${apiPath}/getCarouselPro`,
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // @param {Bussmodel <String>}
        // --------------------------------------*/
            getAllProductsByCategory: `${apiPath}/getProductsByCategory`,
        
        /** --------------------------------------
        // Get Products By Category
        // @param {customerid <String>}
        // @param {subcap <String>}
        // @param {Bussmodel <String>}
        // @returns {}
        // -------------------------------------- */
            // getAllProductsBySubCategory : `${apiPath}/getProductsBySubcap?customerid=1025&subcap=Analytics&Bussmodel=XPLO`'
            getAllProductsBySubCategory : `${apiPath}/getProductsBySubcap`,
        
        /** --------------------------------------
        // Get All Categories
        // @param {Bussmodel <String>}
        // --------------------------------------**/
            getAllCategories : `${apiPath}/getCategories`,
        
        // --------------------------------------
        // Get Sub Categories
        // --------------------------------------
            getSubCapacities : `${apiPath}/getSubCap`,

        // --------------------------------------
        // Get Vendors (Manufacturer)
        // @param {erpid <string>}
        // --------------------------------------
            getVendors : `${apiPath}/getManufacturer`,
        
        /** --------------------------------------
        // Get Product Details
        // @param {partid <String>}
        // --------------------------------------*/
            getProduct : `${apiPath}/getSingleProduct`,
        
        /** --------------------------------------
        // Get Related Products
        // @param {customerid <String>}
        // @param {keyword <String array>, split by coma}
        // --------------------------------------*/
            getRelatedProducts : `${apiPath}/getRelatedPro`,

            
        /** --------------------------------------
        // Get Related Products
        // @param {customerid <String>}
        // @param {keyword <String array>, split by coma}
        // --------------------------------------*/
            getRelatedProductsHard : `${apiPath}/getRelatedPro?customerid=1014&keyword=MDM,Master%20Data,Reference%20Data,%20GDH`,
        
        /** --------------------------------------
        // Get Product Attributes Tabs
        // @param {partid <String> }
        // --------------------------------------*/
            getProductTabs : `${apiPath}/getTabs`,

        /** --------------------------------------
        // Get Tab Values
        // @param {partid <String>}
        // @param {busstypeid <String>}
        // --------------------------------------*/
            getTabAttributes : `${apiPath}/getTabAttributes`,

        /** --------------------------------------
        // Get Tab Values
        // @param {partid <String>}
        // --------------------------------------*/
            getPartRecord : `${apiPath}/getPartRecord`,

        /** --------------------------------------
        // Get Pro Categories
        // @param {busstypeid <String>}
        // --------------------------------------*/
            getProCategories : `${apiPath}/getProCategory`,


        /** --------------------------------------
         * Check if Prjoject Name Already Exists
        // @param Bussmodel=XPLOR
        // @param productName=PCN
        // @returns {}
        // -------------------------------------- */
            checkRepeatedProjectName : `${apiPath}/doesProductNameExist`,


        /** --------------------------------------
        // Get Products Search
        // @param {Bussmodel=XPLOR <String>}
        // --------------------------------------*/
            getProductSearch : `${apiPath}/getProductSearch`,


        /** --------------------------------------
        // Create New Product
        // @param {busstypeid <String>}
        // --------------------------------------*/
            createNewProject : `${apiPath}/insertNewProduct`,

        /** --------------------------------------
        // Update Product
        // @param {busstypeid <String>}
        // --------------------------------------*/
            updateProject : `${apiPath}/updatePartProject`,


        /** --------------------------------------
        // Create/update New Product Attributes
        // @param {busstypeid <String>}
        // --------------------------------------*/
            updateTabAttributes : `${apiPath}/updateTabAttr`,

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
            getXplorITOwners : `${path}/_api/web/sitegroups/getbyid(${ownersSPGroup})/users`
    }