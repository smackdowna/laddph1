const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter Your first_Name"],
    maxLength: [30, "Name cannot exceed 30 charcters"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your last_Name"],
    maxLength: [30, "Name cannot exceed 30 charcters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  country: {
    type: String,
    required: [true, "please enter your country"],
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//comapare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding resetPasswordToken to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Users", userSchema);
