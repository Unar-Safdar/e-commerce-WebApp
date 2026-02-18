const express = require("express")
const router = express.Router()
const auth = require("../MiddleWares/authMiddleware.js")
const { addProduct, getProducts, deleteProduct , updateProduct} = require('../controllers/productController.js');

router.post("/add", addProduct);
router.get("/get", getProducts);
router.delete("/deleteProduct", deleteProduct)
router.put("/updateProduct", updateProduct)



module.exports = router