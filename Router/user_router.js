const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getsinghUser,
  updateProfileRole,
  deleteProfile,
  updatePiProfile,
} = require("../Controllers/users");


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); },

  filename: function (req, file, cb) {

    cb(null, Date.now()  + "-" + file.originalname);

  },
});

// Initialize Multer upload middleware
const upload = multer({ "storage" : storage });

const router = require("express").Router();

const {
  isAuthenticated,
  AuththorizRoles,
} = require("../middleware/isAuthenticated");


router.route("/logout").get(logout);

router.route("/me").get( isAuthenticated, getUserDetails);

router.route("/SignUp").post(signup);

router.route("/login").post(login);

router.route("/password/forget").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/Password/update").put(isAuthenticated, updatePassword);

router
.route("/me/update")
.put(isAuthenticated, updateProfile);

router
  .route("/me/update/pic")
  .post(isAuthenticated, updatePiProfile);


router
  .route("/admin/users")
  .get(isAuthenticated, AuththorizRoles("Admin"), getAllUser);

router
  .route("/admin/users/:id")
  // .get(isAuthenticated, AuththorizRoles("Admin"), getsinghUser)
  // .put(isAuthenticated, AuththorizRoles("Admin"), updateProfileRole)
  .delete(isAuthenticated, AuththorizRoles("Admin"), deleteProfile);

module.exports = router;
