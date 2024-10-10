const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    imageLink : {type: String, require: true},
    title : {type: String, require:true},
    price: {type: Number, require: true},
})

const product = mongoose.model("products", productSchema);
module.exports = product;