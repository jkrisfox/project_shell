const express = require('express');
const Auth = require('./authenticator');

const router = express.Router();
router.route('/').post((req, res) => {
  const { username, password } = req.body;
  Auth.login(username, password).then(
    session => {
      if (session) {
        session.getUser().then(user => {
          res.json({ user_id: user.id });
        });
      } else {
        res.json({ error: 'you are not logged in' });
      }
    },
    error => {
      res.json({ error: error.message });
    }
  );
});

module.exports = router;
