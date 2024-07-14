const { valueHasher } = require("../../../util/hash");
const { createAccount, userLogin } = require("../service/auth");
const { validateInput } = require("../util");
const { BadRequest } = require("../util/requestError");

exports.UserRegistration = async (req, res, next) => {
  try {
    const { full_name, email, password, phone, role } = req.body;
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
    if (!validateInput(phone, "length", 8, 12)) {
      throw new BadRequest(
        "Your phone number must be between 8 and 12 characters."
      );
    }
    if (!validateInput(password, "length", 6, 30)) {
      throw new BadRequest("Your password must be at least 6 characters.");
    }

    const cryptedPassword = await valueHasher(password, 12);

    const values = [full_name, email, phone, cryptedPassword, role];
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

exports.LogoutUser = (req, res) => {
  try {
    //clear the cookie
    res.clearCookie("accessToken");

    // Send a response message along with the status code
    res.status(200).json({ message: "Logout successful", statusCode: 200 });
  } catch (error) {}
};
