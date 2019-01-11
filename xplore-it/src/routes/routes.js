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
    import UserProfile from '../views/User/UserProfile';
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
            path : `${path}/user/details/:UserID`,
            exact: false,
            key:`user-route`,
            component : UserProfile,
        },
    
        {redirect:true, path:'/', to : `${path}/catalogue/all/all`, navbarName: 'Redirect', key : 'index-route' }
    ]




// --------------------------------------
// Export Routes
// --------------------------------------
    export default appNavigationRoutes;