var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    image: String,
    name: String,
    location: String,
    description: String,
}, {
    timestamps : true
})

var PlaceModel = mongoose.model('place', PlaceSchema)

module.exports = PlaceModel;