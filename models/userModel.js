import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto';

// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
  isBlocked: {
    type: Boolean,
    default: false
  }, 
  refreshToken: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
},
{
  timestamps: true,
});

// create password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//   match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// reset password token
userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

//Export the model
const User = mongoose.model("User", userSchema);

export default User;
