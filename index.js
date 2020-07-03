const express=require('express')
const app=express()
const PORT=8000
app.use("/",function(req,res){
    res.send("<h1>Server started succesfully </h1>")
})

app.listen(PORT,function(err){
    if(err)
    {console.log("Error in starting port")}
    else{console.log("Server started successfully");}
    return
})