import PasswordRequest from "../models/passwordRequest.model.js";

export const getAllRequests = async (_, res, next) => {
  try {
    const requests = await PasswordRequest.find().populate({
      path: "user",
      select: "-password -__v -_id",
    });

    res.status(200).json({
      status: "success",
      message: "All password reset requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const getRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resetRequest = await PasswordRequest.findById(id).populate({
      path: "user",
      select: "-password -__v -_id",
    });

    if (!resetRequest) {
      const error = new Error(
        `Password reset request with id ${resetRequest._id} not found`
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      message: `Password reset request with id ${resetRequest._id} fetched succesfully`,
      data: resetRequest,
    });
  } catch (error) {
    next(error);
  }
};
