var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
    text: String,
    price: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Item", itemSchema);