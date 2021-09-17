
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const userRoutes = require("./routes/userRoute");
//conecction
require('dotenv').config();
const path = require('path')
const cors = require('cors')

app.use(cors())
 
mongoose.connect("mongodb+srv://saba:testtest123@twittercluster.bkomr.mongodb.net/twitterdb?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use("/",userRoutes);



app.use(express.static("public"));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3001,()=>{
    console.log(`server is working on 3001 port`)
})