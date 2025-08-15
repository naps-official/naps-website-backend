import User from "../models/users.model.js";

export const createUser = async (req, res, next) => {
  try {
    const { fullName, position } = req.body;

    if (!fullName || !position) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const username = fullName;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    const newUser = new User({
      fullName,
      position,
      username,
    });

    const user = await newUser.save();
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: userObj,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
      total_count: users.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
