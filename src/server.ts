import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

//* Mongoose configuration
async function main() {
  try {
    //* Connect to MongoDB
    await mongoose.connect(config.databaseURI as string);

    //* Listener
    app.listen(config.port, () => {
      console.log(`BikeStore server is listening on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
