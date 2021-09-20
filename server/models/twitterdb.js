const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    posting:{
        type: String,
        required: false
    },
    image:{
        type:String,
        required: false,
    },
 
});

const Posts = mongoose.model("post",PostSchema);
module.exports = Posts;