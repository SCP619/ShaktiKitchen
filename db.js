const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/shaktikitchen', {
  useUnifiedTopology : true,
  useNewUrlParser    : true,
})

module.exports = mongoose.connection
