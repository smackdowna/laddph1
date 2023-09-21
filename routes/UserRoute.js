const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserDetails,
  updateprofilepicture,
  getAllUser,
  getSingleUser,
  updateUserRole,
  updateUserStatus,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");

const router = express.Router();

//register
router.route("/register").post(registerUser);

//login
router.route("/login").post(loginUser);

//forgot password
router.route("/password/forgot").post(forgotPassword);

//reset password
router.route("/password/reset/:token").put(resetPassword);

//logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//change password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//update user details
router.route("/me/update").put(isAuthenticatedUser, updateUserDetails);

//update profile pic
router
  .route("/updateprofilepicture")
  .put(isAuthenticatedUser, singleUpload, updateprofilepicture);

//get all users--Admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

//get single user details
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

module.exports = router;
