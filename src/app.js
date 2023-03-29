//const https = require('https');
//const fs = require('fs');
const express = require("express");
const router = require("./routers/router");
const cors = require("cors");
const connectDB = require("./database/connection");
connectDB();

/*
const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.pem')
};
*/
const app = express();
//enable cors
app.use(cors());
/*
app.use(cors(
    {
        origin: "https://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"],

    }


));
*/
//enable urlencoded capabilities
app.use(express.urlencoded({ extended: true }));
//enable json capabilities
app.use(express.json());
//enable the router
app.use(router);

//const server = https.createServer(options, app);



module.exports = app;
