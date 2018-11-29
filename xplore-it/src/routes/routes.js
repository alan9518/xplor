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
    import axios from 'axios';
    import {Endpoints} from '../services/endpoints';

// --------------------------------------
// Define App Path
// --------------------------------------
    // const path = 'localhost:3000';
    const path = '';


// --------------------------------------
// Fetch Routes
// --------------------------------------
    const softwareTopics = () => {
        return (
            axios.get(Endpoints.getAllCategories)
                .then((data)=> {
                    console.log('data', data.data)
                    return data.data;
                }) 
                .catch(err=>{
                    console.log('error', err);
                })
        )
    }



    

// --------------------------------------
// Icons Colors
// --------------------------------------
    let communication = '#1197D3';
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
// From Home or / to Catalogue View
// --------------------------------------
    // const softwareTopicsRoutes = softwareTopics().re;
    // console.log('softwareTopicsRoutes', softwareTopicsRoutes);


// --------------------------------------
// Create JSON Routes Array
// Last Item is the Defualt Redirect
// From Home or / to Catalogue View
// --------------------------------------
    const appNavigationRoutes = [
        {
            path : `${path}/catalogue`,
            exact: true,
            sidebarName : 'Home',
            key:'home-route',
            component : CatalogueView,
            color : communication,
            homeIcon : 'fas fa-home'
        },
        {
            path : `${path}/communication`,
            exact: false,
            sidebarName : 'Communication',
            key:'communication-route',
            component : CatalogueView,
            color : communication,
            subCategories : [
                {
                    path : `${path}/communication/children1`,
                    exact: false,
                    sidebarName : 'communication 1',
                    key:'communication-route-children1',
                    component : CatalogueView,
                    color : communication,
                },
                {
                    path : `${path}/communication/children2`,
                    exact: false,
                    sidebarName : 'communication 2',
                    key:'communication-route-children2',
                    component : CatalogueView,
                    color : communication,
                }
            ]
        },
        {
            path : `${path}/education`,
            exact: false,
            sidebarName : 'Education',
            key:'education-route',
            component : CatalogueView,
            color : education,
            subCategories : [
                {
                    path : `${path}/education/children1`,
                    exact: false,
                    sidebarName : 'education 1',
                    key:'education-route-children1',
                    component : CatalogueView,
                    color : education,
                },
                {
                    path : `${path}/education/children2`,
                    exact: false,
                    sidebarName : 'education 2',
                    key:'education-route-children2',
                    component : CatalogueView,
                    color : communication,
                }
            ]
        },
        {
            path : `${path}/enviroment`,
            exact: true,
            sidebarName : 'Enviroment',
            key:'enviroment-route',
            component : CatalogueView,
            color : enviroment,
            subCategories : []
        },
        {
            path : `${path}/finance`,
            exact: true,
            sidebarName : 'Finance',
            key:'finance-route',
            component : CatalogueView,
            color : finance,
            subCategories : []
        },
        {
            path : `${path}/human-resources`,
            exact: true,
            sidebarName : 'Human Resources',
            key:'humanResources-route',
            component : CatalogueView,
            color : hr,
            subCategories : []
        },
        {
            path : `${path}/information-technology`,
            exact: true,
            sidebarName : 'Information Technology',
            key:'informationTechnology-route',
            component : CatalogueView,
            color : it,
            subCategories : []
        },
        {
            path : `${path}/legal`,
            exact: true,
            sidebarName : 'Legal',
            key:'legal-route',
            component : CatalogueView,
            color : legal,
            subCategories : []
        },
        {
            path : `${path}/marketing`,
            exact: true,
            sidebarName : 'Marketing',
            key:'marketing-route',
            component : CatalogueView,
            color : marketing,
            subCategories : []
        },
        {
            path : `${path}/quality`,
            exact: true,
            sidebarName : 'Quality',
            key:'quality-route',
            component : CatalogueView,
            color : operations,
            subCategories : []
        },
        {
            path : `${path}/sales`,
            exact: true,
            sidebarName : 'Sales',
            key:'sales-route',
            component : CatalogueView,
            color : sales,
            subCategories : []
        },
        {
            path : `${path}/app/details/:AppID`,
            exact: false,
            key:`app-route-:AppID`,
            component : DetailsView,
        },
        {
            path : `${path}/user/details/:UserID`,
            exact: false,
            key:`user-route`,
            component : UserProfile,
        },
    
        {redirect:true, path:'/', to : `${path}/catalogue`, navbarName: 'Redirect', key : 'index-route' }
    ]




// --------------------------------------
// Export Routes
// --------------------------------------
    export default appNavigationRoutes;