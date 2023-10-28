const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controllers/orderController");
const router = express.Router();

const {isAuthenticated , AuththorizRoles} =require("../middleware/isAuthenticated")

router.route("/order/new").post(isAuthenticated , newOrder);

router.route("/orders/me").get(isAuthenticated , myOrders);

router.route("/order/:id").get(isAuthenticated , getSingleOrder);


router
  .route("/admin/orders")
  .get(isAuthenticated , AuththorizRoles("Admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated , AuththorizRoles("Admin"), updateOrder)
  .delete(isAuthenticated , AuththorizRoles("Admin"), deleteOrder);


module.exports = router