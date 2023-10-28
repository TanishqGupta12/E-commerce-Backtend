const router = require("express").Router();

const { processPayment, sendApiPayment } = require("../Controllers/PaymentsController");
const {isAuthenticated} =require("../middleware/isAuthenticated")

router.route("/payment/process").post(isAuthenticated , processPayment)
router.route("/sendApiPayments").get(isAuthenticated , sendApiPayment)

module.exports = router