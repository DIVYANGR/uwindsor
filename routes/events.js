const express = require('express')
const router = express.Router()
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const EventController = require('../controllers/eventsController')

router.get('/index', EventController.index)
router.post('/show', isAuthenticated, isAdmin, EventController.show)
router.post('/store', isAuthenticated, isAdmin, EventController.store)
router.post('/update', isAuthenticated, isAdmin, EventController.update)
router.post('/addevent', isAuthenticated, EventController.addevent)
//router.post('/update', isAuthenticated, isAdmin, EventController.update)


module.exports = router