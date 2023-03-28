const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  laboratory: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  token: { type: String },  
  patients: [{
    patient: {
      name:{
        type: String,        
      },
      address:{
        type: String,
      },
      phone:{
        type: String,
      },
      email:{
        type: String,
      },
      result: {
        type: String,
      },
      file: { //****125 variaveis numericas */
        type: String,
      }
    }
  }],
  
});

module.exports = mongoose.model("userModel", userSchema);