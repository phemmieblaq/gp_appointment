const { valueHasher } = require("../util/hash");
const {
  getUsersByRole,
  updateUser,
  getAllDoctorsByState,
  verifyAccount,
} = require("../service/auth");
const { createAccount, userLogin } = require("../service/auth");
const { validateInput } = require("../util");
const { BadRequest } = require("../util/requestError");

exports.UserRegistration = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;
    if (!validateInput(full_name, "name")) {
      throw new BadRequest("Invalid full name provided.");
    }
    if (!validateInput(email, "email")) {
      throw new BadRequest("Invalid email provided.");
    }
    if (!validateInput(full_name, "length", 3, 100)) {
      throw new BadRequest(
        "Your first name must be between 3 and 100 characters."
      );
    }
    if (!validateInput(password, "length", 6, 30)) {
      throw new BadRequest("Your password must be at least 6 characters.");
    }

    const cryptedPassword = await valueHasher(password, 12);

    const values = [full_name, email, cryptedPassword, role];
    const createUser = await createAccount(values);

    return res.status(createUser.statusCode).json({
      message: createUser.message,
      data: createUser.data,
      statusCode: createUser.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.UserVerification = async (req, res, next) => {
  try {
    const verifyPayload = req.params.token;

    const verify = await verifyAccount(verifyPayload);

    return res.status(verify.statusCode).json({ message: verify.message });
  } catch (error) {
    next(error);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const payload = { email: email, password: password };
    const login = await userLogin(payload);

    res.cookie("accessToken", login.token, {
      httpOnly: true,
      secure: false, // Set to true if served over HTTPS
      maxAge: 3600000, // 1 hour
    });

    return res.status(login.statusCode).json({
      message: login.message,
      data: login.data,
      statusCode: login.statusCode,
      expiresIn: login.expiresIn,
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdateUser = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const { state, city, phone } = req.body;

    const values = [state, city, phone, 1];
    const createUser = await updateUser(values);

    return res.status(createUser.statusCode).json({
      message: createUser.message,
      data: createUser.data,
      statusCode: createUser.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetUsersByRole = async (req, res, next) => {
  try {
    const role = req.params.role;
    const users = await getUsersByRole(role);
    return res.status(users.statusCode).json({
      message: users.message,
      data: users.data,
      statusCode: users.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAllDoctorsByState = async (req, res, next) => {
  try {
    const state = req.params.state;
    const users = await getAllDoctorsByState(state);
    return res.status(users.statusCode).json({
      message: users.message,
      data: users.data,
      statusCode: users.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.LogoutUser = (req, res) => {
  try {
    //clear the cookie
    res.clearCookie("accessToken");

    // Send a response message along with the status code
    res.status(200).json({ message: "Logout successful", statusCode: 200 });
  } catch (error) {}
};
