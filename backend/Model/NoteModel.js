const mongoose = require('mongoose')




const Schema = mongoose.Schema

const noteSchema = new Schema ({
    name: {
        type:String
    },
    email: {
        type:String
    },
    mobile: {
        type:Number
    }


},{timestamps:true})

module.exports = mongoose.model('Clients', noteSchema)

