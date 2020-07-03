const express=require('express')
const app=express()
const PORT=process.env.PORT || 8000

// view engine setup
app.set('view engine','ejs')
app.set('views',__dirname+'/views')

//setup public folder
app.use(express.static('./public'));
const home=require('./routers/home')
const canteens=require('./routers/canteens')

app.use("/",home)
app.use("/canteen",canteens)

app.listen(PORT,(err)=>{
    if(err) console.log("Error in starting port")
    else console.log(`Server started successfully at ${PORT}`);
})

// const express = require('express')
// var path = require('path');
// const app = express();
// const port = 3000;
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// //setup public folder
// app.use(express.static('./public'));
// app.get('/',function (req, res) {
// res.render('pages/home')
// });
// app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));