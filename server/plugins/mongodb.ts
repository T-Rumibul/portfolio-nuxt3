import * as mongoose from "mongoose";
import { Nitro } from "nitropack";
export default async (_nitro: Nitro) => {
  try {
    const config = useRuntimeConfig();
    const connection = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
