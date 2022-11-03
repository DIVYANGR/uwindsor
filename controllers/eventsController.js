const { response } = require('express')
const Event = require('../models/Events')
const User = require('../models/User')
const Mutex = require('async-mutex').Mutex;

const index = (req, res, next) => {
    Event.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json(
            {
                message: 'An error Occured'
            }
        )
    })
}

const show = (req, res, next) => {
    let eventID = req.body.eventID
    Event.findByID(eventID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json(
            {
                message: 'An error Occured'
            }
        )
    })
}

const store = (req, res, next) => {
    console.log("store method calling")
    let event = new Event({
        eventName: req.body.eventName,
        description: req.body.description,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLoacation,
        speakerName: req.body.speakerName,
        duration: req.body.duration,
        limit: req.body.limit

    })
    event.save()
    .then(response => {
        res.json({
            message: 'Event Added Successfully'
        })
    })
    .catch(error => {
        res.json(
            {
                message: 'An error Occured'
            }
        )
    })
}

const update = (req, res, next) => {
    let eventID = req.body.eventID

    let updateEvent = new Event({
        eventName: req.body.eventName,
        description: req.body.description,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        speakerName: req.body.speakerName,
        duration: req.body.duration,
        limit: req.body.limit
    })
    Event.findByIdAndUpdate(eventID, {$set: updateEvent})
    .then(response => {
        res.json({
            message: 'Event Updated Successfully'
        })
    })
    .catch(error => {
        res.json(
            {
                message: 'An error Occured'
            }
        )
    })
}

const addevent = (req, res, next) => {
    let eventID = req.body.eventID
    let emailID = req.body.email

    Event.findById(eventID, function(err, result){
        const mutex = new Mutex();
        if(err){
            console.log("error to find envent")
        } else{
            mutex.runExclusive(function(){
                if(result.count==result.limit){
                    console.log("limit exceeded")
                }
                else{
                    User.findOne({email:emailID}).updateOne({$push:{events:result}}).clone().then().catch((err)=>{console.log(err); mutex.release();})
                    Event.updateOne({_id:result.id},{ $inc: { count: 1 }})
                        .then(console.log("incrementation successful"))
                        .catch((err)=>{console.log(err); 
                        mutex.release();});
                        console.log(result.count)
                }
            })
        }    
    })
    .then(response => {
        res.json({
            message: 'Event added Successfully'
        })
    })
    .catch(err => {
        res.json({
            message: err
        })
    })
}

module.exports = {
    index, show, store, update, addevent
}

