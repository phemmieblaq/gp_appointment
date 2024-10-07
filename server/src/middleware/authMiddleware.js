const jwt = require("jsonwebtoken");
const { Forbidden, Unauthorized } = require("../util/requestError");

const authorizer = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("token", req.cookies);

  if (!token) {
    throw new Unauthorized("Authorization token is missing");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new Forbidden("Forbidden token");
    }
    console.log("user", user);

    req.user = user;
    next();
  });
  9;
};

module.exports = authorizer;
