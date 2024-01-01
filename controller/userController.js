import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateRefreshToken from "../config/refreshToken.js";
import { generateToken } from "../config/jwtToken.js";

const createUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exists
      // res.json({
      //   message: "User Already Exists",
      //   success: false
      // });
    throw new Error("User Already Exists");
  }
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      name: findAdmin?.name,
      email: findAdmin?.email,
      contact: findAdmin?.contact,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

export {
  createUser,
  loginAdmin
};
