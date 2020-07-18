var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var config = require('./config')
var placeRoute = require('./routes/places')
var cors = require('cors')
var morgan = require('morgan')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors());
require('./config/mongoose.config')
app.use(morgan('dev'))

// middleware
app.use('/place',placeRoute)

var port = process.env.PORT || config.port

app.listen(port, (err, done) => {
    if (err) {
        console.log("Server listening failed.")
    } else {
        console.log("Server listening at port " + port)
    }
})