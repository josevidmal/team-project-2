// HELPER TO VALIDATE USER HAS ADMIN ROLES
const isAdmin = (req, res, next) => {
    // If the user is not Admin, redirect the request to the profile route
    if (!req.session.isAdmin) {
      res.redirect('/profile');
    } else {
      next();
    }
  };
  
  module.exports = isAdmin;