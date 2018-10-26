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
    const path = '';



// --------------------------------------
// Icons Colors
// --------------------------------------
    let communication = '#1197D3';;
    let education = '#07562F';
    let enviroment = '#5F4082';
    let finance = '#84B130' ;
    let hr = '#F6C760';
    let it = '#D60B33';
    let legal = '#238ECC';
    let marketing = '#B60BAC';
    let operations =  '#8F1859';
    let sales = '#E18A50';

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
            color : communication
        },
        {
            path : `${path}/communication`,
            exact: true,
            sidebarName : 'Communication',
            key:'communication-route',
            component : CatalogueView,
            color : communication,
            categories : []
        },
        {
            path : `${path}/education`,
            exact: true,
            sidebarName : 'Education',
            key:'home-route',
            component : CatalogueView,
            color : education,
            categories : []
        },
        {
            path : `${path}/enviroment`,
            exact: true,
            sidebarName : 'Enviroment',
            key:'home-route',
            component : CatalogueView,
            color : enviroment,
            categories : []
        },
        {
            path : `${path}/finance`,
            exact: true,
            sidebarName : 'Finance',
            key:'home-route',
            component : CatalogueView,
            color : finance,
            categories : []
        },
        {
            path : `${path}/human-resources`,
            exact: true,
            sidebarName : 'Human Resources',
            key:'home-route',
            component : CatalogueView,
            color : hr,
            categories : []
        },
        {
            path : `${path}/information-technology`,
            exact: true,
            sidebarName : 'Information Technology',
            key:'home-route',
            component : CatalogueView,
            color : it,
            categories : []
        },
        {
            path : `${path}/legal`,
            exact: true,
            sidebarName : 'Legal',
            key:'home-route',
            component : CatalogueView,
            color : legal,
            categories : []
        },
        {
            path : `${path}/marketing`,
            exact: true,
            sidebarName : 'Marketing',
            key:'home-route',
            component : CatalogueView,
            color : marketing,
            categories : []
        },
        {
            path : `${path}/quality`,
            exact: true,
            sidebarName : 'Quality',
            key:'home-route',
            component : CatalogueView,
            color : operations,
            categories : []
        },
        {
            path : `${path}/sales`,
            exact: true,
            sidebarName : 'Sales',
            key:'home-route',
            component : CatalogueView,
            color : sales,
            categories : []
        },
    
        {redirect:true, path:'/', to : `${path}/catalogue`, navbarName: 'Redirect' }
    ]




// --------------------------------------
// Export Routes
// --------------------------------------
    export default appNavigationRoutes;