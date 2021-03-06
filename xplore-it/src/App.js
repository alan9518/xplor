/* ==========================================================================
 * App File Init Components And Routes 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependeces
// --------------------------------------
  import React, { Component } from 'react';
  import { Router, Route, Switch } from 'react-router-dom';
  import createBrowserHistory from 'history/createBrowserHistory'
  import appNavigationRoutes from './routes';
  import ReactGA from 'react-ga';




// --------------------------------------
// Create Component
// --------------------------------------
  class App extends Component {

    // --------------------------------------
    // Render App, Control Routes
    // Initialize Google Analytics
    // --------------------------------------
    renderApp() {
      const history = createBrowserHistory();
      const CurrentSPUser = window.getCurrentSPUser();
      ReactGA.initialize('UA-131235894-1', {
        debug: true,
        titleCase: false,
        gaOptions: {
          userId: CurrentSPUser.user_ID,
          dimensionValue: CurrentSPUser.user_email
        }
      });

      ReactGA.pageview(window.location.pathname + window.location.search);
  

      // Return Routes
      return (
        <Router history={history}>
          <Switch>
            {appNavigationRoutes.map((prop, key) => {
              return <Route path={prop.path} component={prop.component} key={`index-${key}`} ></Route>
            })}
          </Switch>

        </Router>
      );
    }



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
