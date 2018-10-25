/* ==========================================================================
 * App File Init Components And Routes 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependeces
// --------------------------------------
  import React, { Component } from 'react';
  import logo from './logo.svg';
  import './App.css';



// --------------------------------------
// Create Component
// --------------------------------------
  class App extends Component {

    // --------------------------------------
    // Render Component
    // --------------------------------------
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
  }


  
// --------------------------------------
// Export Component
// --------------------------------------

  export default App;
