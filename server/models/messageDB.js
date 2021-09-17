const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    message:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false ,
    }
  
});

const Messages = mongoose.model("message",MessageSchema);
module.exports = Messages;