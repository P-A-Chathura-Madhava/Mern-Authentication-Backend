import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  postalAddress: {
    type: String,
    required: true,
  },
  noOfEmployees: {
    type: Number,
    required: true,
  },
  nameOfCeo: {
    type: String,
    required: true,
  },
  emailCeo: {
    type: String,
    required: true,
    unique: true,
  },
  yourName: {
    type: String,
    required: true,
  },
  yourDesignation: {
    type: String,
    required: true,
  },  
  yourContact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "company"
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

//Export the model
const Company = mongoose.model("Company", companySchema);

export default Company;
