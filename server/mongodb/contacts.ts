import { Schema, model } from "mongoose";
import { IContact } from "~~/typing";
const Contact = new Schema<IContact>({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export const contactModel = model("contact", Contact);
