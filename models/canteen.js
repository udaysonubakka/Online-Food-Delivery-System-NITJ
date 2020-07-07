var mongoose = require("mongoose");

var canteenSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   owner: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   items: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Item"
      }
   ]
});

module.exports = mongoose.model("Canteen", canteenSchema);