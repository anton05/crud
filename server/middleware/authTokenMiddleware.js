const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(" ")[1];

    if (!token) {
      return res.status(401).end();
    }

    jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).send('Expires of jwt is end').end();
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};