const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Signup Schema
const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  Country: {
    type: String,
    default: "India",
  },
  Password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: new Date(),
  },
});

// Hashing the password before saving the user data by using Bcrypt Module
UserSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    const securepass = await bcrypt.hash(this.Password, 10);
    this.Password = securepass;
  }
  next();
});

module.exports = mongoose.model("Users", UserSchema);
