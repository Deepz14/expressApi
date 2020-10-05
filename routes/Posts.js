const express = require('express');

const router = express.Router();

const Post = require('../models/Post');

const {RegisterValidation, LoginValidation} = require('../validation');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

//Register
router.post('/register', async(req, res) => {
    //Validate a request
    const {error} = RegisterValidation(req.body);
    if (error)
      return res.status(400).json({ Message: error.details[0].message });

    //check if the email is already in a database 
    const emailExist = await Post.findOne({Email : req.body.Email});
    if (emailExist)
        return res.status(400).json({Message : "Email is Already exist"});

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.Password, salt);    

    try{ 
         const post = new Post({
           Name: req.body.Name,
           Email: req.body.Email,
           Password: hashpassword
         });    
        const savePost = await post.save()
        res.status(200).json({id : post._id});
    }
    catch(err){
        res.status(400).json({Message : err});
    }
})

//Login
router.post('/login', async(req, res) => {
    //Validate a request
    const {error} = LoginValidation(req.body);
    if (error)
      return res.status(400).json({ Message: error.details[0].message });
    
    //check if the email is exist
    const userExist = await Post.findOne({Email : req.body.Email});
    if (!userExist)
        return res.status(400).json({Message : "Email is not Found"});

    //Check password
    const validPassword = await bcrypt.compare(req.body.Password, userExist.Password);
    if(!validPassword)
        return res.status(400).send('Invalid Password');

    const token = jwt.sign({id : userExist._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);    
})

// router.get('/register', async(req, res) => {
//     try{
//         const getPost = await Post.find();
//         console.log(getPost)
//         res.status(200).json(getPost); 
//     }
//     catch(err){
//         res.status(400).json({Message : err});
//     }
// })

// router.get('/register:id', async (req, res) => {
//     try {
//         const individualPost = await Post.findById(req.params.id);
//         res.status(200).json(individualPost);
//     }
//     catch(err){
//         res.status(400).json({ Message: err });
//     }
// })

// router.patch('/register:id', async (req, res) => {
//     try {
//         const updatePost = await Post.updateOne({_id:req.params.id}, {$set : {title : req.body.title}});
//         res.status(200).json(updatePost);
//     }
//     catch (err) {
//         res.status(400).json({ Message: err });
//     }
// })

// router.delete('/register:id', async (req, res) => {
//     try {
//         const delPost = await Post.deleteOne({_id:req.params.id});
//         res.status(200).json(delPost);
//     }
//     catch(err){
//         res.status(400).json({ Message: err });
//     }
// })

module.exports = router;