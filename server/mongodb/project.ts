import mongoose, { Schema } from 'mongoose';
import type { IIcon, ILangFramework, ILocalized, IProject } from '../../typing';

const IconSchema = new Schema<IIcon>(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
    },
    { _id: false }
);

const LangFrameworkSchema = new Schema<ILangFramework>(
    {
        icon: { type: IconSchema, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
);

const LocalizedSchema = new Schema<ILocalized>(
    {
        en: { type: String, default: '' },
        ru: { type: String, default: '' },
        uk: { type: String, default: '' },
    },
    { _id: false }
);

const ProjectSchema = new Schema<IProject>(
    {
        type: { 
          type: {
            icon: { type: IconSchema, required: true },
            value: { type: String, required: true },
            
        },
        required: true
      },
        title: { type: LocalizedSchema, required: true },
        description: { type: LocalizedSchema, required: true },
        lang: { type: [LangFrameworkSchema], default: [] },
        framework: { type: [LangFrameworkSchema], default: [] },
        git: { type: String, required: false },
        link: { type: String, required: false },
        thumbnail: { type: String, required: true },
        hidden: { type: Boolean, default: false },
    }
);

const Project = mongoose.model('portfolio_project', ProjectSchema);

export default Project;