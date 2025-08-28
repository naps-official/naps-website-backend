import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/users.model.js";
import PasswordRequest from "../models/passwordRequest.model.js";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env.js";

export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        postion: user.position,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      status: "success",
      message: "User signed in successfully",
      data: {
        token,
        user: userObj,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      const error = new Error(
        "New password cannot be the same as Old password"
      );
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      const error = new Error("Your old password is not correct");
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
      data: userObj,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordRequest = async (req, res, next) => {
  try {
    const { username, position } = req.body;

    if (!username && !position) {
      const error = new Error("Username or position is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ username, position });

    if (!user) {
      const error = new Error("Invalid username or position");
      error.statusCode = 400;
      throw error;
    }

    const passwordRequest = new PasswordRequest({
      user: user._id,
    });
    await passwordRequest.save();

    res.status(200).json({
      status: "success",
      message: "Password reset request created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleResetPasswordRequest = async (req, res, next) => {
  try {
    const { requestId, requestStatus } = req.body;

    if (!requestId && requestStatus) {
      const error = new Error("Request ID and request status is required");
      error.statusCode = 400;
      throw error;
    }

    const resetPasswordRequest = await PasswordRequest.findById(
      requestId
    ).populate({
      path: "user",
      select: "-password",
    });

    if (!resetPasswordRequest) {
      const error = new Error("Password Reset Request can not be found");
      error.statusCode = 404;
      throw error;
    }

    if (resetPasswordRequest.status !== "pending") {
      return res.status(200).json({
        status: "success",
        message: `Reset Password Request has already been ${resetPasswordRequest.status}`,
      });
    }

    resetPasswordRequest.status = requestStatus;

    if (requestStatus === "rejected") {
      await resetRequestPassword.save();
      return res.status(200).json({
        status: "success",
        message: "Reset Password Request rejected",
      });
    }

    const user = resetPasswordRequest.user;
    const newPassword = crypto.randomBytes(8).toString("hex");

    user.password = newPassword;

    await resetPasswordRequest.save();
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
      data: {
        newPassword,
        resetPasswordRequest,
      },
    });
  } catch (error) {
    next(error);
  }
};
