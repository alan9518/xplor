/* ==========================================================================
 * Add New App Button on Content Header Component 
 * 29/10/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from "react";
    import PropTypes from "prop-types";

// --------------------------------------
// Create and Export Component
// --------------------------------------
    const HeaderButton = resourceMail => {
        let userMail = encodeURIComponent(resourceMail.resourceMail);
        let HeaderButton = `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${userMail}&UA=0&size=HR64x64&sc=1535401630498`;

        return <img src={HeaderButton} className="xpl-userImageMin xpl-rounded" />;
    };

// --------------------------------------
// Prop Types
// --------------------------------------
HeaderButton.propTypes = {
  resourceMail: PropTypes.object
};

// --------------------------------------
// Export Component
// --------------------------------------
export default HeaderButton;
