const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.DB);
async function dbCon() {
  try {
    const db = await mongoose
      .connect(`mongodb+srv://unarsafii_db_user:${process.env.DB_PASS}@cluster0.9mynpst.mongodb.net/ecommerce?retryWrites=true&w=majority`)
      .then(() => console.log("database connected"))
      .catch((err) => console.log(`connection failed ${err}`));
    mongoose.connection.on("connected", () =>
      console.log("DATABASE SUCCESSFULLY CONNECTED...!")
    );

    mongoose.connection.on("disconnected", () =>
      console.log("DATABASE CONNECTION TERMINATED...!")
    );
  } catch (err) {
    console.log(err, "here is an error");
  }
}

module.exports = dbCon;