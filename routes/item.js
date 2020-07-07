var express = require("express");
var router  = express.Router({mergeParams: true});
var Canteen = require("../models/canteen");
var Item = require("../models/item");
var middleware = require("../middleware");

//Items New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find canteen by id
    console.log(req.params.id);
    Canteen.findById(req.params.id, function(err, canteen){
        if(err){
            console.log(err);
        } else {
             res.render("items/new", {canteen: canteen});
        }
    })
});

//Items Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup canteen using ID
   Canteen.findById(req.params.id, function(err, canteen){
       if(err){
           console.log(err);
           res.redirect("/canteens");
       } else {
        Item.create(req.body.item, function(err, item){
           if(err){
               console.log(err);
           } else {
               //add username and id to item
               item.owner.id = req.user._id;
               item.owner.username = req.user.username;
               //save item
               item.save();
               canteen.items.push(item);
               canteen.save();
               console.log(item);
               req.flash('success', 'Created a item!');
               res.redirect('/canteens/' + canteen._id);
           }
        });
       }
   });
});

router.get("/:itemId/edit", middleware.isLoggedIn, function(req, res){
    // find canteen by id
    Item.findById(req.params.itemId, function(err, item){
        if(err){
            console.log(err);
        } else {
             res.render("items/edit", {canteen_id: req.params.id, item: item});
        }
    })
});

router.put("/:itemId", function(req, res){
   Item.findByIdAndUpdate(req.params.itemId, req.body.item, function(err, item){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/canteens/" + req.params.id);
       }
   }); 
});

router.delete("/:itemId",middleware.checkUserItem, function(req, res){
    Item.findByIdAndRemove(req.params.itemId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/canteens/" + req.params.id);
        }
    })
});

module.exports = router;