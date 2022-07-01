const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const healthExpertSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hospital: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})
  
  healthExpertSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.password);
    },
  };
const HealthExpert = mongoose.model('HealthExpert', healthExpertSchema)
module.exports = HealthExpert