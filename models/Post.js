const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Name : {
        type : String,
        required: true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    Date : {
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('User', PostSchema);