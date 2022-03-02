const User = require("../models/User");

const isAdmin = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route

    if (req.session.logged_in && User.type === "admin" ) {
      res.render('newTrip');
    } else {
      next();
    }
  };
  
  module.exports = isAdmin;