// //In this file, we will create a schema(blueprint) of a MenuItem

const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ["sweet","spicy","sour"],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingrediants: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0,
    }
})

// //Create MenuItem Model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
// //NOTE: We will use in server.js file