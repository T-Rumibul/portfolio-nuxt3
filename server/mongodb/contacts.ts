import { Schema, model } from "mongoose";
import { IContact, IIcon } from "~~/typing";
const IconSchema = new Schema<IIcon>(
    {
        name: { type: String, required: true },
        color: { type: String, required: false },
    },
    { _id: false }
);
const Contact = new Schema<IContact>({
  icon: {
    type: IconSchema,
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
