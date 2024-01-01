import Company from "../models/companyModel.js";
import asyncHandler from "express-async-handler";

const getAllCompanies = asyncHandler(async (req, res) => {
  try {
    const getCompanies = await Company.find();
    res.json(getCompanies);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  getAllCompanies,
};
