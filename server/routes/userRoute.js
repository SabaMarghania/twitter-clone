const express = require ("express");
const router = express.Router();
const multer = require ('multer')
const PostModel = require("../models/twitterdb")
const PollModel = require("../models/polldb")
const UserModel = require("../models/users")
const MessageModel = require("../models/messageDB")
const app = express();
const parser = require('../middleware/cloudinary.config')
const { 
  authUser,
  registerUser,
} =require("../controllers/userCtrl.js");





//del msg
router.delete('/deleteMsg/:id',async (req,res)=>{
  const id = req.params.id;

  await MessageModel.findByIdAndDelete(id).exec();
  res.status(200).send("");

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


router.post('/message', parser.single("image"),async (req,res)=>{
  const messageDb = new MessageModel({
      message:req.body.message ,
      image: req.file.path ,
      
  });

  try{
    res.status(200).send("");
      await messageDb.save();
  }catch(err){
      console.log(err);
  }
})
router.post('/message2', parser.single("image"),async (req,res)=>{
  const messageDb = new MessageModel({
      message:req.body.message ,
      
  });

  try{
    res.status(200).send("");
      await messageDb.save();
  }catch(err){
      console.log(err);
  }
})
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
router.put('/edit', parser.single("image"),async (req,res)=>{

  try{
     await PostModel.findById(req.body.id,(err,updatedPost)=>{
          updatedPost.posting = req.body.newText;
          updatedPost.image = req.file.path;

          updatedPost.save();
          res.status(200).send("");

      })

  }catch(err){
       console.log(err);
  }
})
router.put('/edit2', parser.single("newFile"),async (req,res)=>{

  try{
     await PostModel.findById(req.body.id,(err,updatedPost)=>{
          updatedPost.posting = req.body.newText;

          updatedPost.save();
          res.status(200).send("");

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
  res.status(200).send("");

})
router.delete('/deletePoll/:id',async (req,res)=>{
  const id = req.params.id;

  await PollModel.findByIdAndDelete(id).exec();
  res.status(200).send("");

})
router.post('/poll',async (req,res)=>{
  const polls = new PollModel({
      title:req.body.title ,
      option1:req.body.option1 ,
      option2:req.body.option2 ,
      option3:req.body.option3 ,
  });

  try{
    res.status(200).send("");

      await polls.save();
  }catch(err){
       console.log(err);
  }
})

router.post('/insert2', parser.single("image"),async (req,res)=>{

  
  const posts = new PostModel({
        posting:req.body.post ,
    });
try{
  res.status(200).send("");

    await posts.save();
}catch(err){
    console.log("image/post error -> ", err);
}


})

router.post('/insert', parser.single("image"),async (req,res)=>{
  
    const posts = new PostModel({
          posting:req.body.post ,
          image: req.file.path ,
      });
  try{
    res.status(200).send("");
      await posts.save();
  }catch(err){
      console.log("image/post error -> ", err);
  }


})

module.exports = router
