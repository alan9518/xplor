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
  import appNavigationRoutes from './routes';



// --------------------------------------
// Create Component
// --------------------------------------
  class App extends Component {

    // renderApp() {
    //   return (
    //     <Router>

    //         <Switch>
    //           {appNavigationRoutes.map((prop, key)=> {
    //             return <Route path = {prop.path}  component = {prop.component}  key = {`index-${key}`} ></Route>
    //           })}
    //         </Switch>
        
    //     </Router>
    //   );
    // }

    renderApp() {
      return (
        <BrowserRouter>

            <Switch>
              {appNavigationRoutes.map((prop, key)=> {
                return <Route path = {prop.path}  component = {prop.component}  key = {`index-${key}`} ></Route>
              })}
            </Switch>
        
        </BrowserRouter>
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
