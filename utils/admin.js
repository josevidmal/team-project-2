const User = require("../models/User");

const isAdmin = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route

    if (User.type === "admin" && req.session.logged_in ) {
      res.render('newTrip');
    } else {
      next();
    }
  };
  
  module.exports = isAdmin;