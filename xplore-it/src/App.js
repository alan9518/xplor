/* ==========================================================================
 * App File Init Components And Routes 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependeces
// --------------------------------------
  import React, { Component } from 'react';
  import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
  import createBrowserHistory from 'history/createBrowserHistory'
  import appNavigationRoutes from './routes';
  import ReactGA from 'react-ga';




// --------------------------------------
// Create Component
// --------------------------------------
  class App extends Component {

    renderApp() {
      const history = createBrowserHistory();
      const CurrentSPUser = window.getCurrentSPUser();
      ReactGA.initialize('UA-131235894-1', {
        debug: true,
        titleCase: false,
        gaOptions: {
          userId: CurrentSPUser.user_ID,
          dimensionValue : CurrentSPUser.user_email
        }
      });
      
      ReactGA.pageview(window.location.pathname + window.location.search);
      console.log('ReactGA', ReactGA);
      console.log('history', history);

      return (
        <Router history = {history}>
        

            <Switch>
              {appNavigationRoutes.map((prop, key)=> {
                return <Route path = {prop.path}  component = {prop.component}  key = {`index-${key}`} ></Route>
              })}
            </Switch>
        
        </Router>
      );
    }

    // renderApp() {
    //   return (
    //     <BrowserRouter>

    //         <Switch>
    //           {appNavigationRoutes.map((prop, key)=> {
    //             return <Route path = {prop.path}  component = {prop.component}  key = {`index-${key}`} ></Route>
    //           })}
    //         </Switch>
        
    //     </BrowserRouter>
    //   );
    // }

    // --------------------------------------
    // Render Component
    // Set Router
    // Map Routes to determine wich one to Render
    // --------------------------------------
    render() {
      return this.renderApp();
    }
  }



// --------------------------------------
// Export Component
// --------------------------------------

  export default App;
