const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
  catagory: {
    type     : String,
    trim     : true,
    required : true,
  },
  items: [
    {
      image     : {
        type     : String,
        default : '',
      },
      name     : {
        type     : String,
        required : true,
      },
      price    : {
        type     : Number,
        default : 0,
        required : true,
      },
      description : {
        type     : String,
        default : '',
      },
    }
  ]
})

const store = mongoose.model('store', storeSchema)
module.exports = store
