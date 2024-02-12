const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, "secret");

    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
}

module.exports = { authToken };
