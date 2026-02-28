const express = require("express")
const router = express.Router()
const auth = require("../MiddleWares/authMiddleware.js")
const { addProduct, getProducts, deleteProduct , updateProduct} = require('../controllers/productController.js');
const verifyAdmin = require("../MiddleWares/checkRole.js");
// const mailSend = require("../controllers/Nodemailer.js")

router.post("/addproduct", auth, verifyAdmin, addProduct);
// router.post("/sendmail", mailSend)
router.get("/getproduct", getProducts);
router.delete("/deleteProduct", deleteProduct)
router.put("/updateProduct", updateProduct)





module.exports = router