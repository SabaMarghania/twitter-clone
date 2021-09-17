const UserModel = require("../models/users.js");
const generateToken = require("../utils/generateToken.js");
const moment = require('moment')
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      pic: user.pic,
      birth: moment(user.birth).format('MMM Do, YYYY'),
      username: user.username,
      token: generateToken(user._id),
    });
    } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
    }
    
 }

  const registerUser = async (req, res) => {
    const { username, email, password,pic,birth} = req.body;

    const userExists = await UserModel.findOne({ email });
  
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
  
    const user = await UserModel.create({
      username,
      email,
      password,
      pic,
      birth,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        pic: user.pic,
        birth: moment(user.birth).format('MMM Do, YYYY'),
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  };
  module.exports = { authUser, registerUser };