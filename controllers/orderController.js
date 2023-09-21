const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const Plan = require("../models/planModel");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { cardDetailsInfo, orderItems, paymentInfo, itemsPrice, totalPrice } =
    req.body;

  const order = await Order.create({
    cardDetailsInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'users',
        'first_name'
    )
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });


// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  });




// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
});
  

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Settled") {
      return next(new ErrorHandler("You have already settled this order", 400));
    }
  
    order.orderStatus = req.body.status;
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });