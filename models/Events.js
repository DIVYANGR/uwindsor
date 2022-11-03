const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventsSchema = new Schema({
    eventName: {
        type: String,
        required : [true, 'Please add a Event name']
    },
    description: {
        type: String,
        required : [true, 'Please add a description']
    },
    eventDate: {
        type: Date,
        required : [true, 'Please add a Event date']
    },
    eventLocation: {
        type: String,
        required : [true, 'Please add a Event location']
    },
    speakerName: {
        type: String,
        required : [true, 'Please add a speaker name'],
    },
    duration: {
        type: Number,
        required : [true, 'Please add a duration']
    },
    limit: {
        type: Number,
        required : [true, 'Please add a limit']
    },
    count: {
        type: Number,
        default: 0
    }
},{timestamps: true})

const Events = mongoose.model('Events', eventsSchema)
module.exports = Events