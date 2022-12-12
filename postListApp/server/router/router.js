const express = require('express');
const mongoose=require('mongoose');
const Post = require('../db/posts');

const router = express.Router();

//5000:/posts/..
router.get('/',async (req,res)=>{
   try {
        const allPosts = await Post.find()
         res.json(allPosts);
   } catch (err) {
    console.log(err);
   }
})

router.get('/:id',async (req,res)=>{
    try {
        const {id}=req.params;
    const post = await Post.findById(id);
    if(!post || !mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"Not Found"})
    res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"bad request"})
    }
})

router.post('/',async (req,res)=>{
   try {
    const post = req.body;
   const createdPost = await Post.create(post);
   res.status(201).json(createdPost);
   } catch (error) {
    console.log(error);
   }
})

//update
router.put('/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const{title,content,creator}=req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('post bulunamadi')
        }
        const updatePost ={title,content,creator, _id:id}
        console.log("laayttt:: " + creator)
        await Post.findByIdAndUpdate(id,updatePost,{new:true})

        res.json(updatePost);
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const {id}=req.params;
    await Post.findByIdAndRemove(id);
    res.json({message:"silindii"})
    } catch (error) {
        console.log(error);
    }
   
    
})

module.exports=router;