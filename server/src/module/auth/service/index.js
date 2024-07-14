const { dbPool } = require("../../../config/dbConnection");
const {
  createUserQuery,
  checkUserByEmailQuery,
} = require("../../../query/auth");
const { matchChecker } = require("../../../util/hash");
const { BadRequest, NotFound } = require("../util/requestError");
const { generateToken } = require("../util/token");

const createAccount = async (values) => {
  try {
    const checkUserExistence = await dbPool.query(checkUserByEmailQuery, [
      values[2],
    ]);

    if (checkUserExistence.rowCount === 1) {
      throw new BadRequest("Email already exists");
    }

    const createUser = await dbPool.query(createUserQuery, values);

    if (!createUser) {
      throw new BadRequest("Error occured while creating user");
    }
    return {
      message: "Account created successfully",
      data: {
        id: createUser.rows[0].id,
        full_name: createUser.rows[0].full_name,
        email: createUser.rows[0].email,
        phone: createUser.rows[0].phone,
        role: createUser.rows[0].role,
      },
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const userLogin = async (payload) => {
  try {
    const checkUserExistence = await dbPool.query(checkUserByEmailQuery, [
      payload.email,
    ]);
    if (checkUserExistence.rowCount !== 1) {
      throw new NotFound("User does not exist!");
    }

    let checkPassword = await matchChecker(
      payload.password,
      checkUserExistence.rows[0].password
    );

    if (!checkPassword) {
      throw new BadRequest("Invalid credentials!");
    }

    const userSecret = process.env.TOKEN_USER_SECRET;
    const token = generateToken(
      { id: checkUserExistence.rows[0].id },
      userSecret,
      "1h"
    );
    //Get the current date timestamp
    const currentDate = Date.now();

    //add 1hour in milliseconds
    const oneHourLater = new Date(currentDate + 3600000);
    return {
      message: "User login successfully",
      data: {
        id: checkUserExistence.rows[0].id,
        full_name: checkUserExistence.rows[0].full_name,
        email: checkUserExistence.rows[0].email,
        phone: checkUserExistence.rows[0].phone,
        role: checkUserExistence.rows[0].role,
      },
      token: token,
      expiresIn: oneHourLater,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccount,
  userLogin,
};
