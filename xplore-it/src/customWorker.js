/* ==========================================================================
 * Custom Service Worker 
 * 19/12/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Global Values
// --------------------------------------
    const sw = './customWorker.js';
// --------------------------------------
// Register Service Worker
// --------------------------------------
    // if('serviceWorker' in navigator) {
    //     window.addEventListener('load', ()=>{
    //         navigator.serviceWorker.register(sw)
    //             .then((registration) => {

    //             }
    //     })
    // }