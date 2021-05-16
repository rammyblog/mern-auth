const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/sendEmail");
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const isMatch = user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/password-reset/${resetToken}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password </p>
      <a href=${resetURL} clicktracking=off>${resetURL}</a>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        html: message,
        from: process.env.EMAIL_FROM,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.log(error);
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.resetPassword = (req, res, next) => {
  res.send("reset route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
