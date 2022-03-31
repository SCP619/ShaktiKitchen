const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  name          : {
    type     : String,
    required : true,
  },
  email         : {
    type     : String,
    required : true,
  },
  phone         : {
    type     : Number,
    required : true,
  },
  paymentMethod : {
    type     : String,
    required : true,
  },
  product       : {
    type     : String,
    required : true,
  },
  quantity      : {
    type     : Number,
    required : true,
  },
  price         : {
    type     : Number,
    required : true,
  },
})

const cart = mongoose.model('cart', cartSchema)
module.exports = cart
