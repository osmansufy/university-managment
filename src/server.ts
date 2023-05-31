import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);
    app.listen(config.port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("Database not connected", error);
  }
}

main();
