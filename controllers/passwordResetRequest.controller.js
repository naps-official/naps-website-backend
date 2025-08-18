import PasswordRequest from "../models/passwordRequest.model";

export const getAllRequests = async (_, res, next) => {
  try {
    const requests = await PasswordRequest.find().populate({
      path: "user",
      select: "-password __v -_id",
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
