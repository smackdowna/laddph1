const Plan = require("../models/planModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//create plan--Admin
exports.createPlan = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;

  const plan = await Plan.create(req.body);

  res.status(201).json({
    success: true,
    plan,
  });
});

//get all plan
exports.getAllPlan = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 2;
  const planCount = await Plan.countDocuments();

  const apiFeature = new ApiFeatures(Plan.find(), req.query).search().filter().pagination(resultPerPage);
  const plans = await apiFeature.query;

  res.status(200).json({
    success: true,
    planCount,
    plans,
  });
});

//update plan---Admin
exports.updatePlan = catchAsyncErrors(async (req, res, next) => {
  let plan = await Plan.findById(req.params.id);

  if (!plan) return next(new ErrorHandler("Plan Not found", 404));

  plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    plan,
  });
});

//delete plan
exports.deletePlan = catchAsyncErrors(async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) return next(new ErrorHandler("Plan Not found", 404));
  await plan.deleteOne();

  res.status(200).json({
    success: true,
    message: "Plan deleted successfully",
  });
});

//get a single plan details
exports.getplanDetails = catchAsyncErrors(async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  if (!plan) return next(new ErrorHandler("Plan Not found", 404));

  res.status(200).json({
    success: true,
    plan,
  });
});
