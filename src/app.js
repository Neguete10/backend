const express = require("express");
const router = require("./routers/router");
const cors = require("cors");

const connectDB = require("./database/connection");
connectDB();

const app = express();
//enable urlencoded capabilities
app.use(express.urlencoded({ extended: true }));
//enable json capabilities
app.use(express.json());
//enable cors
app.use(cors());
//enable the router
app.use(router);

module.exports = app;
