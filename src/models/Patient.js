const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordsSchema = new Schema({
    date: {
        type: Date
    },
    condition: {
        type: String
    },
    healthExpert: {
        type: ObjectId,
        ref: 'HealthExpert'
    }
},{timestamps: true}
)

const patientSchema = new Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
    records: [recordsSchema]
}, {timestamps: true})

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient