const Errorhandler = require("../utils/errorhander");
const jwt = require("jsonwebtoken");
const models = require("../models/sign_model");

exports.isAuthenticated = async (req, res, next) => {
  try {
    if (!req.cookies.cookietoken) {
      return next(
        new Errorhandler("Please Login to access this resource", 401)
      );
    }

    const decoded = jwt.verify(
      req.cookies.cookietoken,
      "kkjdhgkdghekrhguiegihekjghweoghuiewhgiuehgihlwieghwli"
    );
  
    req.user = await models.findById(decoded.id);

    next();
  } catch (error) {
    console.log(error);
  }
};

exports.AuththorizRoles = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role ${req.user.role} is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};
