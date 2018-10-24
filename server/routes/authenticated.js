const { User } = require('../models');

function authenticated(req, res, next) {
  const userId = req.get('user-id');
  if (userId) {
    User.findById(userId).then(user => {
      if (user) {
        req.authenticatedUser = user;
        next();
      } else {
        res.status(403).json({
          msg: 'You must be authenticated to access this resource'
        });
      }
    });
  } else {
    res.status(403).json({ msg: 'You must be authenticated to access this resource' });
  }
}

module.exports = authenticated;
