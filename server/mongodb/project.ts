import { Schema, model } from "mongoose";
const Project = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tech: {
    type: Array<string>,
    required: true,
  },
  git: {
    type: String,
    required: true,
  },
  pages: {
    type: Array<string>,
    required: true,
  },
});

export const projectModel = model("project", Project);
