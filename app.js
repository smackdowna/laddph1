const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//Route imports
const plan = require("./routes/planRoute");
const user = require("./routes/UserRoute");
const orders = require("./routes/OrderRoutes");

app.use("/api/v1",plan);
app.use("/api/v1",user);
app.use("/api/v1",orders);


//middleware
app.use(errorMiddleware);

module.exports = app;