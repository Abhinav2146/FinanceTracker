const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/expense-tracker`);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
