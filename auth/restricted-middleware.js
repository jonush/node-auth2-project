const jwt = require('jsonwebtoken');
const secrets = require('../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ error: "Access Denied" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(403).json({ message: "You shall not pass!" });
  }
};