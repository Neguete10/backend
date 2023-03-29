//const https = require('https');
//const fs = require('fs');
const express = require("express");
const router = require("./routers/router");
const cors = require("cors");
const connectDB = require("./database/connection");
connectDB();

/*
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};
*/
const app = express();
//enable cors
app.use(cors());
//enable urlencoded capabilities
app.use(express.urlencoded({ extended: true }));
//enable json capabilities
app.use(express.json());
//enable the router
app.use(router);

//const server = https.createServer(options, app);



module.exports = app;
