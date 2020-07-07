var express = require("express");
var router  = express.Router();
var Canteen = require("../models/canteen");
var middleware = require("../middleware");
var request = require("request");

//INDEX - show all canteens
router.get("/", function(req, res){
    // Get all canteens from DB
    console.log("YEahboy")
    Canteen.find({}, function(err, allCanteens){
       if(err){
           console.log(err);
       } else {
           request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Modulus homepage.
                res.render("canteens/index",{canteens:allCanteens});

            }
});
       }
    });
});

//CREATE - add new canteen to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to canteens array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var owner = {
        id: req.user._id,
        username: req.user.username
    }
    var newCanteen = {name: name, image: image, description: desc, owner:owner}
    // Create a new canteen and save to DB
    Canteen.create(newCanteen, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to canteens page
            console.log(newlyCreated);
            res.redirect("/canteens");
        }
    });
});

//NEW - show form to create new canteen
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("canteens/new"); 
});

// SHOW - shows more info about one canteen
router.get("/:id", function(req, res){
    //find the canteen with provided ID
    console.log("Yeahhh");
    Canteen.findById(req.params.id).populate("items").exec(function(err, foundCanteen){
        if(err){
            console.log(err);
        } else {
            console.log(foundCanteen)
            console.log(foundCanteen.items)
            //render show template with that canteen
            res.render("canteens/show", {canteen: foundCanteen});
        }
    });
});

router.get("/:id/edit", middleware.checkUserCanteen, function(req, res){
    console.log("IN EDIT!");
    //find the canteen with provided ID
    Canteen.findById(req.params.id, function(err, foundCanteen){
        if(err){
            console.log(err);
        } else {
            //render show template with that canteen
            res.render("canteens/edit", {canteen: foundCanteen});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.desc};
    Canteen.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, canteen){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/canteens/" + canteen._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;

