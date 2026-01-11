import { skillsModel } from "~~/server/mongodb";
import { APIResponse, ISkillCat } from "~~/typing";

export default defineEventHandler(async (event): Promise<APIResponse<ISkillCat>> => {
        if(event.context.auth !== true) {
        return {
            success: false,
            message: 'Unauthorized',
        }
    }
    const body = await readBody(event);
    const {  icon, name, skills } = body;
    if (!icon || !name || !skills) {
        return {
            success: false,
            message: 'All fields are required',
        }
    }
    
    const all = await skillsModel.create({
        icon,
        name,
        skills
    });
    await all.save()
    return {
        success: true,
        message: 'Skill created successfully',
        result: all
    };
});
