/* ==========================================================================
 * App File Init Components And Routes 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependeces
// --------------------------------------
  import React, { Component } from 'react';
  import { BrowserRouter, Route, Switch } from 'react-router-dom';
  import appNavigationRoutes from './routes';
  // import Perf from 'react-addons-perf';
  // const Perf = require('react-addons-perf'); // ES5 with npm





// --------------------------------------
// Create Component
// --------------------------------------
  class App extends Component {

    // --------------------------------------
    // Render Component
    // Set Router
    // Map Routes to determine wich one to Render
    // --------------------------------------
    render() {
      return (
        <BrowserRouter>

            <Switch>
              {appNavigationRoutes.map((prop, key)=> {
                return <Route path = {prop.path}  component = {prop.component}  key = {`index-${key}`}   ></Route>
              })}
            </Switch>
        
        </BrowserRouter>
      );
    }
  }



// --------------------------------------
// Export Component
// --------------------------------------

  export default App;
