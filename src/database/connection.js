const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const dotenv = require("dotenv").config();
const MONGODB_ATLAS = process.env.MONGODB_ATLAS;


const connectDB = () => {
  mongoose
    .connect(
      MONGODB_ATLAS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,        
      }
    )
    .then(() => {
      console.log("MongoDB Atlas Connected");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;