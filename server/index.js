
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const userRoutes = require("./routes/userRoute");
const dotenv = require('dotenv')
//conecction
dotenv.config();



mongoose.connect("mongodb+srv://saba:test123@cluster0.t4pyn.mongodb.net/twitterdb?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use("/", userRoutes);


app.listen(3001,()=>{
    console.log(`server is working on 3001 port`)
})