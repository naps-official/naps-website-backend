import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/users.model.js";
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
