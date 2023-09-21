const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

//create new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//get single order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//get logged in user order
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//get all order--Admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

//update order status
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);

module.exports = router;
