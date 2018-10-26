/* ==========================================================================
 * Define the App Routes 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Components
// --------------------------------------
    import CatalogueView from '../views/Dashboard/Dashboard';


// --------------------------------------
// Define App Path
// --------------------------------------
    // const path = 'localhost:3000';
    const path = ''



// --------------------------------------
// Create JSON Routes Array
// Last Item is the Defualt Redirect
// From Home or /
// --------------------------------------
    const appNavigationRoutes = [
        {
            path : `${path}/catalogue`,
            exact: true,
            sidebarName : 'Home',
            key:'home-route',
            component : CatalogueView,
            icon : ''
        },
        {redirect:true, path:'/', to : `${path}/catalogue`, navbarName: 'Redirect' }
    ]




// --------------------------------------
// Export Routes
// --------------------------------------
    export default appNavigationRoutes;