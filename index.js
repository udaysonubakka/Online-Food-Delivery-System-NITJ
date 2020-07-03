const express=require('express')
const app=express()
const PORT=process.env.PORT || 8000

app.set('view engine','ejs')
const homeController=require('./controller/homeController')

app.use("/",homeController)

app.listen(PORT,(err)=>{
    if(err) console.log("Error in starting port")
    else console.log("Server started successfully");
})