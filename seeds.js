var mongoose = require("mongoose");
var Canteen = require("./models/canteen");
var Item   = require("./models/item");

var item = [
    {
        text: "chicken",
        price: "Rs.10/-",
    },

]
var data = [
    {
        name: "Snackers", 
        image: "https://images.unsplash.com/photo-1508213824875-83a3d36e72a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "",
        // items:[item,item,item,item,]
    },
    {
        name: "Night Canteen", 
        image: "https://images.unsplash.com/photo-1564936281440-2c36f57db305?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: " mollit anim id est laborum",
        // items:[item,item,item,item,]
    },
    {
        name: "Lipton Canteen", 
        image: "https://images.unsplash.com/photo-1559762665-f2d87882713e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: " anim id est laborum",
        // items:[item,item,item,item,]
    }
]

function seedDB(){

   //Remove all canteens
   Canteen.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed canteens!");});
    
         //add a few canteens
        data.forEach(function(seed){
            Canteen.create(seed, function(err, canteen){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a canteen"+canteen);
                    //create a item
                    for(var i=0;i<5;i++){
                        console.log(i);
                        Item.create(
                            {
                                text: `Chincken${i}`,
                                price: "Rs.10/-",
                                owner: canteen
                            }, function(err, item){
                                if(err){
                                    console.log(err);
                                } else {
                                    canteen.items.push(item);
                                    console.log(canteen.items);
                                }
                            });
                        }
                        canteen.save((err,can)=>{
                            
                            console.log(canteen.name)
                            console.log(canteen.items);
                            console.log("saved!2")
                        });
                    }
            });
        });
     
    //add a few items
}

module.exports = seedDB;
