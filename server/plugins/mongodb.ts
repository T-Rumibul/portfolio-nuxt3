import * as mongoose from "mongoose";
import type { Nitro } from "nitropack";
export default async (_nitro: Nitro) => {
  try {
    const config = useRuntimeConfig();
    const connection = await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Mongodb error:`, error);
  }
};
