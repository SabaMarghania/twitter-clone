const mongoose = require("mongoose");
const PollSchema = new mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    option1:{
        type: String,
        required: false
    },
    option2:{
        type:String,
        required: false
    },
    option3:{
        type: String,
        required: false
    },
});

const Polls = mongoose.model("poll",PollSchema);
module.exports = Polls;