import { Schema, model } from "mongoose";


interface IIcon {
    name: string;
    color: string;
}
interface ISkill {
    icon: IIcon;
    name: string 
}
interface ISkillCategory {
  icon: IIcon;
  name: string;
  skills: ISkill[]
}


const IconSchema = new Schema<IIcon>(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
    },
    { _id: false }
);
const SkillSchema = new Schema<ISkill>(
    {
        icon: { type: IconSchema, required: true },
        name: { type: String, required: true },
   
    },
    { _id: false }
);
const SkillCategorySchema = new Schema<ISkillCategory>(
    {
        icon: { type: IconSchema, required: true },
        name: { type: String, required: true },
        skills: { type: [SkillSchema], required: true}
    }
);

export const skillsModel = model("skills", SkillCategorySchema);
