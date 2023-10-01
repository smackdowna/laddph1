const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route imports
const plan = require("./routes/planRoute");
const user = require("./routes/UserRoute");
const orders = require("./routes/OrderRoutes");
const payment = require("./routes/pymentRoute");


app.use("/api/v1", plan);
app.use("/api/v1", user);
app.use("/api/v1", orders);
app.use("/api/v1", payment);

//middleware
app.use(errorMiddleware);

module.exports = app;
