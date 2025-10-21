var jwt = require('jsonwebtoken');
const JWT_SECRET = 'HimanshuSoftwareDeveloper';
const fetchuser = (req, res, next) => {
  // GET the user from JWT token and add id to req object
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ error: 'Authentication Required' });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Authentication Required' });
  }
};
module.exports = fetchuser;
