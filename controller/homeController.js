const express=require('express')
const router=express.Router()


router.get("/",(req,res)=>res.render('pages/index'))  
router.get("/about",(req,res)=>res.render('pages/about'))  
router.get("/contact",(req,res)=>res.render('pages/contact'))  
router.get("/login",(req,res)=>res.render('pages/login'))  
router.get("/signUp",(req,res)=>res.render('pages/signup'))  
router.get("/lipton",(req,res)=>res.render('pages/lipton'))  
router.get("/nightCanteen",(req,res)=>res.render('pages/nightCanteen'))  
router.get("/snakers",(req,res)=>res.render('pages/Snakers'))  

module.exports(router);