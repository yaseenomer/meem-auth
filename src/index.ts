import { app } from "./app";
import mongoose from "mongoose";
import { InternalServerError } from "@meemsd/common";
import { MONGODB_URI, PORT } from "./utils/secret.util";



const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    throw new InternalServerError();
  }

  app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );
};

start();
