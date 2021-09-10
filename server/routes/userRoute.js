const express = require ("express");
const router = express.Router();
const multer = require ('multer')
const PostModel = require("../models/twitterdb")
const PollModel = require("../models/polldb")
const UserModel = require("../models/users")
const MessageModel = require("../models/messageDB")
const generateToken = require('../utils/generateToken')
const { 
  authUser,
  registerUser,
} =require("../controllers/userCtrl.js");
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
      cb(null,'../client/public/uploads/');
  },
  filename:(req,file,cb) =>{
      cb(null,file.originalname);
  }
})

const upload = multer({storage:storage})

//del msg
router.delete('/deleteMsg/:id',async (req,res)=>{
  const id = req.params.id;

  await MessageModel.findByIdAndDelete(id).exec();

})
// chat

//get messages
router.get('/getMessages', (req,res)=>{
  MessageModel.find({},(err,result)=>{
      if(err){
          res.send(err);
      }

       res.send(result);
  })
  
})
router.post('/message', upload.single("messageImage"),async (req,res)=>{
  const img = req.file.originalname
 
  const messageDb = new MessageModel({
      message:req.body.message ,
      messageimg: img ,
      
  });

  try{
  
      await messageDb.save();
  }catch(err){
      console.log(err);
  }
})
router.post('/message2', upload.single("messageImage"),async (req,res)=>{
 
  const messageDb = new MessageModel({
      message:req.body.message ,
      
  });

  try{
  
      await messageDb.save();
  }catch(err){
      console.log(err);
  }
})
// db.singleFieldDemo.find({"StudentAge":18},{"StudentName":1,"_id":0});

router.get('/getUser', (req,res)=>{
  UserModel.find({},(err,result)=>{
      if(err){
          res.send(err);
      }

       res.send(result);
  })
  
})

router.post("/register",registerUser);
router.post("/login", authUser)

router.get('/read', (req,res)=>{
  PostModel.find({},(err,result)=>{
      if(err){
          res.send(err);
      }

       res.send(result);
  })
  
})
router.get('/pollsData', (req,res)=>{
  PollModel.find({},(err,result)=>{
      if(err){
          res.send(err);
      }

        res.send(result);
  })
  
})
router.put('/edit', upload.single("newFile"),async (req,res)=>{

  try{
     await PostModel.findById(req.body.id,(err,updatedPost)=>{
          updatedPost.posting = req.body.newText;
          updatedPost.img = req.file.originalname;

          updatedPost.save();

      })
  }catch(err){
       console.log(err);
  }
})
router.put('/edit2', upload.single("newFile"),async (req,res)=>{

  try{
     await PostModel.findById(req.body.id,(err,updatedPost)=>{
          updatedPost.posting = req.body.newText;

          updatedPost.save();

      })
  }catch(err){
       console.log(err);
  }
})
router.put('/editPoll',async (req,res)=>{

  try{
     await PollModel.findById(req.body.id,(err,updatedPoll)=>{
          updatedPoll.title = req.body.newTitle;
          updatedPoll.option1 = req.body.newOption1;
          updatedPoll.option2 = req.body.newOption2;
          updatedPoll.option3 = req.body.newOption3;
          updatedPoll.save();
          res.send("Post has been updated");
      })
  }catch(err){
       console.log(err);
  }
})
router.delete('/delete/:id',async (req,res)=>{
  const id = req.params.id;

  await PostModel.findByIdAndDelete(id).exec();

})
router.delete('/deletePoll/:id',async (req,res)=>{
  const id = req.params.id;

  await PollModel.findByIdAndDelete(id).exec();

})
router.post('/poll',async (req,res)=>{
  const polls = new PollModel({
      title:req.body.title ,
      option1:req.body.option1 ,
      option2:req.body.option2 ,
      option3:req.body.option3 ,
  });

  try{
      await polls.save();
  }catch(err){
       console.log(err);
  }
})

router.post('/insert2', upload.single("postImage"),async (req,res)=>{
  const posts = new PostModel({
      posting:req.body.post ,
  });

  try{
      await posts.save();
  }catch(err){
      console.log(err);
  }
})

router.post('/insert', upload.single("postImage"),async (req,res)=>{
    const posts = new PostModel({
          posting:req.body.post ,
          img: req.file.originalname ,
      });
         
  try{
      await posts.save();
  }catch(err){
      console.log(err);
  }


})
module.exports = router;
