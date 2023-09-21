const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cardDetailsInfo: {
      cardHolderName:{
        type: String,
        required: [true, "Please Enter Card Holder Name"],
      },
      phoneNumber:{
        type: String,
        minlength:[10,"phone number can't be less than 10 digit"],
        maxlength:[10,"phone number can't e greater than 10 digit"],
        required: [true, "Please Enter phone number"]
      },
      country:{
        type: String,
        required: [true, "Please Enter your country"]
      },
      zipCode:{
        type: String,
        required: [true, "Please Enter zip code"]
      },
      state:{
        type: String,
        required: [true, "Please Enter state"]
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        plan: {
          type: mongoose.Schema.ObjectId,
          ref: "Plan",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Order", orderSchema);