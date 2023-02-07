const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_DEV_CDN;
mongoose.set("strictQuery", false);

async function dbConection() {
  try {
    mongoose.connect(mongoDB);
    console.log("Database Online");
  } catch (error) {
    console.log("Error : Database conection");
    console.error(error);
  }
}

module.exports = { dbConection };
