var Item = require("../models/item");
var Canteen = require("../models/canteen");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");
    },
    checkUserCanteen: function(req, res, next){
        if(req.isAuthenticated()){
            Canteen.findById(req.params.id, function(err, canteen){
               if(canteen.owner.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   console.log("BADD!!!");
                   res.redirect("/canteens/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/login");
        }
    },
    checkUserItem: function(req, res, next){
        console.log("YOU MADE IT!");
        if(req.isAuthenticated()){
            Item.findById(req.params.itemId, function(err, item){
               if(item.owner.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("/canteens/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("login");
        }
    }
}