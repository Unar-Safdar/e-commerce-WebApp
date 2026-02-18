const express = require("express")
const router = express.Router()
const auth = require("../MiddleWares/authMiddleware.js")

const {Signup, Login, Logout} = require("../controllers/authController.js")
router.post("/signup", Signup)
router.post("/login", Login)
router.post("/logout", Logout)
router.get('/profile', auth, (req, res)=> {
    res.send({message : "profile"})
})
module.exports = router