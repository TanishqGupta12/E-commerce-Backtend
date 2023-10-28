const db = require("../db");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const models = new db.Schema({
  Name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },

  Email: {
    type: String,
    required: [true, "Please enter your email"],
  },

  Password: {
    type: String,
    select: false,
    required: [true, "Please Enter Your Password"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),
    },
  },

  Address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  PhoneNumber: {
    type: String,
    required: [true, "Please Enter Your PhoneNumber"],
    validate: {
      validator: (value) =>
        validator.isLength(value, {
          min: 0,
          max: 10,
        }),
    },
  },
  role: {
    type: String,
    default: "user",
  },
  Avatar: {
    type: String,
    default: "none",
  },

  resetPasswardToken: String,
  resetPasswardExprise: Date,
});

models.pre("save", function (next) {
  if (!this.isModified("Password")) {
    return next();
  }

  try {
    this.Password = bcrypt.hashSync(this.Password, 10);

    next();
  } catch (err) {
    next(err);
  }
});

// compare Password
models.methods.comparePassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.Password);
};
//   JWT TOKEN

models.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id },
    "kkjdhgkdghekrhguiegihekjghweoghuiewhgiuehgihlwieghwli",
    {
      expiresIn: "5d",
    }
  );
};

//  generating password

models.methods.getRetSetPassword = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswardToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set resetPasswordExpire field
  this.resetPasswardExprise = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = db.model("sign", models);
