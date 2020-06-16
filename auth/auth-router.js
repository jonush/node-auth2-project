const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');
const secrets = require('../config/secret');

router.post('/register', (req,res) => {
  const credentials = req.body;

  if(isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      })
  } else {
    res.status(400).json({ error: "Username and password required"});
  }
});

router.post('/login', (req,res) => {
  const { username, password } = req.body;

  if(isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        console.log('user', user);
        if(user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({ message: "Welcome to the API", token });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ message: err.message });
      })
  } else {
    res.status(500).json({ message: "Username and password required" });
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;