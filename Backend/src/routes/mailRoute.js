const express = require("express")
const router = express.Router()
const getData = require("../controllers/GimniApiIntegratiom.js")
const mailSend = require("../controllers/Nodemailer.js")

router.post("/sendmail", mailSend)
router.post("/senddata", getData)


module.exports = router