var mongoose = require('mongoose')
var config = require('./index')

mongoose.set('useUnifiedTopology', true)

mongoose.connect(config.dbUrl + '/' + config.dbName, { useNewUrlParser: true }, (err, done) => {
    if (err)
        console.log('error in connecting to db')
    else
        console.log('db connection success')
})