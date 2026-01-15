import { Schema, model } from "mongoose";
import { skillsModel } from "./skills";
import type { IResumeItem, IResume } from '../../typing';
import { contactModel } from "./contacts";

const resumeItemSchema = new Schema<IResumeItem>(
    {
        name: { type: String, required: true },
        position: { type: String, required: true },
        aboutme: { type: String, required: true },
    },
    { _id: false }
);


const resume = new Schema<IResume>({
    _id: { type: String, required: true },
    en: { type: resumeItemSchema, required: true },
    ru: { type: resumeItemSchema, required: true },
    uk: { type: resumeItemSchema, required: true },
    skillCategories: { type: [skillsModel.schema], required: true },
    contacts: { type: [contactModel.schema], required: true },
});

export const resumeModel = model("resume", resume);
