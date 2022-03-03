const isAdmin = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route

    if (req.session.islogged_in && req.session.isAdmin) {
      res.render('/newTrip');
    } else {
      next();
    }
  };
  
  module.exports = isAdmin;