const jwt = require("jsonwebtoken");
const { Forbidden, Unauthorized } = require("../util/requestError");
const { dbPool } = require("../config/dbConnection");
const { checkUserByRoleAndIDQuery } = require("../query/auth");

// Middleware function to authorize incoming requests
const authorizer = (role) => {
  return async (req, res, next) => {
    const token = req?.cookies?.accessToken; // Access the token from HTTP-only cookies

    // Check if token is missing
    if (!token) {
      throw new Unauthorized("Authorization token is missing");
    }

    // Verify the token
    const user = jwt.verify(token, process.env.TOKEN_USER_SECRET);
    if (!user) {
      // Handle token verification error
      throw new Unauthorized("Invalid or expired user token.");
    }

    const checkUser = await dbPool.query(checkUserByRoleAndIDQuery, [
      user.id,
      role,
    ]);

    if (checkUser.rowCount !== 1) {
      throw new Forbidden("User is not authorized.");
    }

    req.user = checkUser;

    next(); // Proceed to next middleware
  };
};
module.exports = authorizer;
