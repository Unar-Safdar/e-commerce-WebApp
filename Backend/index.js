// console.log('hello world')
const express = require('express');
const Db = require('./src/Db/db.js')
const authRoute = require("./src/routes/authRoute.js")
const productRoutes = require("./src/routes/productRoute.js")
const cors = require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser()); 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
Db();
app.get('/', (req, res, next) => {
    res.send('hello world!');
})
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,               // allow cookies if needed
}));
app.use(express.json())
app.use("/api", authRoute)
app.use("/api/product", productRoutes)
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`server is running, on port : ${PORT}`)
})