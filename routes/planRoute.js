const express = require("express");
const {
  getAllPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getplanDetails,
} = require("../controllers/planController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//create plan
router
  .route("/admin/create/plan")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPlan);

//get all plan
router.route("/plans").get(getAllPlan);

//update/delete plan and get single product details
router
  .route("/admin/plan/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePlan)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePlan);

router.route("/plan/:id").get(getplanDetails);

module.exports = router;
