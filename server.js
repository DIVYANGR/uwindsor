const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/error');
const cors = require('cors');
const cookieParser = require('cookie-parser');


mongoose.connect('mongodb+srv://uwindsor:divyangk1998@cluster0.q5mywwu.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

app.use(express.json())
// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
    }));
app.use(cookieParser());
app.use(cors());

app.use('/api/event', require('./routes/events'))
app.use('/api/user', require('./routes/auth'))  

app.use(errorHandler);

const PORT = process.env.PORT || 8081

var server = app.listen(PORT, ()=> {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
