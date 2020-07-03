const express=require('express')
const router=express.Router()


router.get("/",(req,res)=>res.render('canteens/allCanteens'))  
router.get("/lipton",(req,res)=>res.render('canteens/lipton'))  
router.get("/nightCanteen",(req,res)=>res.render('canteens/nightCanteen'))  
router.get("/snakers",(req,res)=>res.render('canteens/snackers'))  

module.exports=router;