const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    plan_name:{
        type:String,
        required:[true,"Plese enter plan name"]
    },
    description:{
        type:String,
        required:[true,"Plese enter description"]
    },
    platform:{
        type:String,
        required:[true,"Plese enter platform"]
    },
    plan_type:{
        type:String,
        
    },
    prefrence:{
        type:String,
    },
    category:{
        type:String,
    },
    account_size:{
        type:Number,
        required:[true,"Plese enter account_size"]
    },
    fee:{
        type:Number,
        required:[true,"Plese enter fee"]
    },
    profitShare:{
        type:String,
        required:[true,"Plese enter profitShare"]
    },
    phase1ProfitTarget:{
        type:String,
        required:[true,"Plese enter phase1ProfitTarget"]
    },
    phase2ProfitTarget:{
        type:String,
        required:[true,"Plese enter phase2ProfitTarget"]
    },
    maximumDailyLoss:{
        type:String,
        required:[true,"Plese enter maximumDailyLoss"]
    },
    maximumOverallLoss:{
        type:String,
        required:[true,"Plese enter maximumOverallLoss"]
    },
    drawdownType:{
        type:String,
        required:[true,"Plese enter drawdownType"]
    },
    timeLimit:{
        type:String,
        required:[true,"Plese enter timeLimit"]
    },
    maximumTradingDays:{
        type:String,
        required:[true,"Plese enter maximumTradingDays"]
    },
    commisions:{
        type:String,
        required:[true,"Plese enter commisions"]
    },
    profitSplitUpto:{
        type:String,
        required:[true,"Plese enter profitSplitUpto"]
    },
    tradingLeverage:{
        type:String,
        required:[true,"Plese enter tradingLeverage"]
    },
    newsTrading:{
        type:String,
        required:[true,"Plese enter newsTrading"]
    },
    expertAdvisior:{
        type:String,
        required:[true,"Plese enter expertAdvisior"]
    },
    weekendHolding:{
        type:String,
        required:[true,"Plese enter weekendHolding"]
    },
    tradeCopiers:{
        type:String,
        required:[true,"Plese enter tradeCopiers"]
    },
    ResetDiscount:{
        type:String,
        required:[true,"Plese enter ResetDiscount"]
    }, 
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    } 
});


module.exports = mongoose.model("Plan",planSchema);