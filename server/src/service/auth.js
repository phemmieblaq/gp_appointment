const { dbPool } = require("../config/dbConnection");
const {
  createUserQuery,
  checkUserByEmailQuery,
  checkUsersByRole,
  updateUserQuery,
  checkUserExistenceQueryById,
  getDoctorsByState,
  updateUserStatusQuery,
} = require("../query/auth");
const { EmailSender } = require("../util/emailEngine");
const { matchChecker } = require("../util/hash");
const { BadRequest, NotFound } = require("../util/requestError");
const { generateToken, verifyUserToken } = require("../util/token");

const createAccount = async (values) => {
  try {
    const checkUserExistence = await dbPool.query(checkUserByEmailQuery, [
      values[1],
    ]);

    if (checkUserExistence.rowCount === 1) {
      throw new BadRequest("Email already exists");
    }

    const createUser = await dbPool.query(createUserQuery, values);

    if (!createUser) {
      throw new BadRequest("Error occured while creating user");
    }

    //send user email
    const userSecret = process.env.TOKEN_USER_SECRET;
    const emailVerificationToken = generateToken(
      { id: createUser.rows[0].id },
      userSecret,
      "30m"
    );

    const subject = "Account created successfully.";
    const url = `${process.env.BASE_URL}/user/activate/${emailVerificationToken}`;

    const payload = {
      name: createUser.rows[0].full_name?.slice(
        0,
        createUser?.fullName?.indexOf(" ")
      ),
      url: url,
    };

    const senderEmail = '"GB Appointment" <akinyemibamidele2@gmail.com>';
    const recipientEmail = createUser.rows[0].email;

    EmailSender(
      subject,
      payload,
      recipientEmail,
      senderEmail,
      "../view/verify.ejs"
    );

    return {
      message: "Account created successfully",
      data: {
        id: createUser.rows[0].id,
        full_name: createUser.rows[0].full_name,
        email: createUser.rows[0].email,
        role: createUser.rows[0].role,
      },
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

// verify user account service
const verifyAccount = async (verifyPayload) => {
  try {
    const userSecret = process.env.TOKEN_USER_SECRET;
    const user = await verifyUserToken(verifyPayload, userSecret);

    const checkUserExistence = await dbPool.query(checkUserExistenceQueryById, [
      user.id,
    ]);
    if (checkUserExistence.rowCount !== 1) {
      throw new NotFound("User does not exist!");
    }

    if (checkUserExistence.rows[0].isVerified == true) {
      throw new BadRequest("This account is already verified.");
    }

    const updateUser = await dbPool.query(updateUserStatusQuery, [
      checkUserExistence.rows[0].id,
    ]);

    if (updateUser.rowCount !== 1) {
      throw new BadRequest("Error occurred while updating user");
    }

    const response = {
      message: "Your account is now verified.",
      statusCode: 200,
    };
    return response;
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

    return {
      message: "User login successfully",
      token: token,
      data: {
        id: checkUserExistence.rows[0].id,
        full_name: checkUserExistence.rows[0].full_name,
        email: checkUserExistence.rows[0].email,
        phone: checkUserExistence.rows[0].phone,
        role: checkUserExistence.rows[0].role,
        state: checkUserExistence.rows[0].state,
        phone: checkUserExistence.rows[0].phone,
        city: checkUserExistence.rows[0].city,
        updated_at: checkUserExistence.rows[0].updated_at,
        created_at: checkUserExistence.rows[0].created_at,
      },

      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const updateUser = async (values) => {
  try {
    const checkUserExistence = await dbPool.query(checkUserExistenceQueryById, [
      1,
    ]);
    if (checkUserExistence.rowCount !== 1) {
      throw new NotFound("User does not exist!");
    }

    const updateUser = await dbPool.query(updateUserQuery, values);

    if (updateUser.rowCount !== 1) {
      throw new BadRequest("Error occurred while updating user");
    }

    return {
      message: "User updated successfully",
      data: {
        id: updateUser.rows[0].id,
        full_name: updateUser.rows[0].full_name,
        email: updateUser.rows[0].email,
        phone: updateUser.rows[0].phone,
        role: updateUser.rows[0].role,
        state: updateUser.rows[0].state,
        phone: updateUser.rows[0].phone,
        city: updateUser.rows[0].city,
        updated_at: updateUser.rows[0].updated_at,
        created_at: updateUser.rows[0].created_at,
      },
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getUsersByRole = async (role) => {
  try {
    const getUsersByRole = await dbPool.query(checkUsersByRole, [role]);
    if (getUsersByRole.rowCount < 1) {
      throw new NotFound("No record found!");
    }

    return {
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() + "s"
      } fetched successfully`,
      data: getUsersByRole.rows,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getAllDoctorsByState = async (state) => {
  try {
    const getUsersByState = await dbPool.query(getDoctorsByState, [state]);
    if (getUsersByState.rowCount < 1) {
      throw new NotFound("No record found!");
    }

    return {
      message: `Doctors in ${state
        .charAt(0)
        .toUpperCase()} fetched successfully`,
      data: getUsersByState.rows,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccount,
  userLogin,
  updateUser,
  getUsersByRole,
  getAllDoctorsByState,
  verifyAccount,
};
