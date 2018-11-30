/* ==========================================================================
 * Define the App Routes From WebService
 * 29/11/2018
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
    // Routes Class
    // --------------------------------------
        class Routes {
            constructor() {
                this.navigationRoutes = [];
                this.colorsArray = [
                    {BPCode:'COMMS', color : '#1197D3'},
                    {BPCode:'EDUCATION', color : '#07562F'},
                    {BPCode:'enviroment', color : '#5F4082'},
                    {BPCode:'finance', color : '#84B130' },
                    {BPCode:'hr', color : '#F6C760'},
                    {BPCode:'it', color : '#D60B33'},
                    {BPCode:'legal', color : '#238ECC'},
                    {BPCode:'marketing', color : '#B60BAC'},
                    {BPCode:'operations', color :  '#8F1859'},
                    {BPCode:'sales', color : '#E18A50'},
                ]
            }

            /** --------------------------------------
            // Get Routes
            // TODO
            // @returns {returns a Promise}
            // --------------------------------------*/
            async getNavigationRoutesfromAPI() {

                const routesPromise = await axios.get(Endpoints.getAllCategories);
                const routesArray = await routesPromise.data;
                // const homeRoute = {
                //     path : `${path}/catalogue`,
                //     exact: true,
                //     sidebarName : 'Home',
                //     key:'home-route',
                //     component : CatalogueView,
                //     color : communication,
                //     homeIcon : 'fas fa-home'
                // }
                
                // Iterate the Response to Add the Colors

                // const navigationArray = routesArray.map((route) => {

                // })




                return routesArray;




            }

        
        }

    export default Routes;       

