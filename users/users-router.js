const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req,res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users, decodedToken: req.decodedToken });
    })
    .catch(err => {
      console.log(err);
      req.status(500).json({ error: "Unable to fetch users" });
    })
});

module.exports = router;