import { Schema, model } from "mongoose";
import { skillsModel } from "./skills";
import type { IResumeItem, IResumeLocalized } from '../../typing';

const resumeItemSchema = new Schema<IResumeItem>(
    {
        name: { type: String, required: true },
        position: { type: String, required: true },
        aboutme: { type: String, required: true },
    },
    { _id: false }
);


const resume = new Schema<IResumeLocalized>({
    _id: { type: String, required: true },
    en: { type: resumeItemSchema, required: true },
    ru: { type: resumeItemSchema, required: true },
    uk: { type: resumeItemSchema, required: true },
});

export const resumeModel = model("resume", resume);
