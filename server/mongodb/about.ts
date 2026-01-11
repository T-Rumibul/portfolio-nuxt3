import { Schema, model } from "mongoose";




const About = new Schema({
   _id: {
    type: String, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

export const aboutModel = model("about", About);
