/* ==========================================================================
 * Define the App Routes 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Components
// --------------------------------------
    import CatalogueView from '../views/Dashboard/Dashboard';
    import DetailsView from '../views/Details/DetailsView';
    // import UserProfile from '../views/User/UserProfile';
    import EditView from '../views/EditProject/EditProject'
    import NewProjectView from '../views/NewProject/NewProject'
    import {Config} from '../Config';


// --------------------------------------
// Define App Path
// --------------------------------------
    const path = Config.spPath;

    

// --------------------------------------
// Icons Colors
// --------------------------------------
    let communication = '#1197D3';



// --------------------------------------
// Create JSON Routes Array
// Last Item is the Defualt Redirect
// From Home or / to Catalogue View
// --------------------------------------
    const appNavigationRoutes = [
        {
            path : `${path}/catalogue/:topic/:key`,
            exact: false,
            sidebarName : 'Home',
            key:'home-route',
            component : CatalogueView,
            color : communication,
            homeIcon : 'fas fa-home'
        },
        {
            path : `${path}/app/details/:partID`,
            exact: false,
            key:`app-route-:partID`,
            component : DetailsView,
        },
        {
            path : `${path}/addProject/`,
            sidebarName : 'Add Product',
            exact: true,
            key:`app-route-addProduct`,
            color : communication,
            component : NewProjectView,
            addProjectIcon : 'fas fa-add'
        },

        {
            path : `${path}/edit/`,
            
            exact: false,
            key:`app-route-addProduct`,
            color : communication,
            component : EditView,
            
        },
    
        {redirect:true, path:'/', to : `${path}/catalogue/all/all`, navbarName: 'Redirect', key : 'index-route' }
    ]




// --------------------------------------
// Export Routes
// --------------------------------------
    export default appNavigationRoutes;