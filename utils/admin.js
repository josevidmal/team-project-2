const User = require("../models/User");

const isAdmin = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route

    User.logged_in = true;

    if (!req.session.logged_in && User.type === "admin" ) {
      console.log(`${User.first_name} is ${User.type}`);
    } else {
      next();
    }
  };
  
  module.exports = isAdmin;