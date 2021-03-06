/* ==========================================================================
 * Xplore-IT Main Entry Point 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */

 // --------------------------------------
 // Internet Explorer Compatibility
 // --------------------------------------
    
    import "babel-polyfill";
    import 'core-js/es6/map';
    import 'core-js/es6/set';
    import 'raf/polyfill';
 

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';


// --------------------------------------
// Deactivate Console.log on Production
// --------------------------------------
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
  }


// --------------------------------------
// Render Application
// --------------------------------------
    ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
