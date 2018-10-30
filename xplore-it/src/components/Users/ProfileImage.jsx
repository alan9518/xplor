/* ==========================================================================
 * Create Profile Image For User Component
 * Stateless Component
 * 28/08/2018
 * Alan Medina Silva
 ========================================================================== */


// --------------------------------------
// Import Dependences
// --------------------------------------
    import React from 'react'
    import PropTypes from 'prop-types'


// --------------------------------------
// Create and Export Component
// --------------------------------------
    const ProfileImage = (resourceMail) => {
        let userMail = encodeURIComponent(resourceMail.resourceMail);
        let profileImage = `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${userMail}&UA=0&size=HR64x64&sc=1535401630498`;

        return (
            <img src={profileImage} className="xpl-userImageMin xpl-rounded" />
        )
    }





// --------------------------------------
// Prop Types
// --------------------------------------
    ProfileImage.propTypes = {
        resourceMail : PropTypes.string
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default ProfileImage;

