const express = require("express")
const router = express.Router();
const product = require("./schema")


router.post("/upload", async (req, res) => {
    const {imageLink, title, price} = req.body;
    const newProduct = new product({
        imageLink,
        title,
        price
    })
    await newProduct.save()
    return res.json({status: true, message: "Product is saved in rr website"});
})

router.get("/update/:id", (req, res) => {
    const id = req.params.id;
    product.findById(id)
    .then(productData => {
        if (!productData) {
            return res.status(404).json({error: "product not found"})
        }
        res.json(productData)
    })
    .catch((err) =>  {
        console.error(err)
        res.status(500).json({error: "internal server error"})
    })
})

router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const {imageLink, title, price} = req.body;

    product.findByIdAndUpdate(id, {imageLink, title, price})
    .then(productData => {
        if (!productData) {
            return res.status(400).json({message : "Product not found"})
        }
        res.json(productData)
    })
    .catch(err => {
        console.error("Error in updating the product details", err)
    })
})

router.get("/getproducts", async (req, res) => {
    product.find()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.error("Error in getting the product list", err);
    });
})

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    product.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

module.exports = { ProductRouter: router };