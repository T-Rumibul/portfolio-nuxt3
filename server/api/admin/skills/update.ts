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
    const {  _id, icon, name, skills } = body;
    if (!_id || !icon || !name || !skills) {
        return {
            success: false,
            message: 'All fields are required'
        }
    }
   
    const all = await skillsModel.findByIdAndUpdate(_id, {
        icon,
        name,
        skills
    });
    if(!all) {
        return {
            success: false,
            message: 'Not found'
        };
    }
   await all.save()
    return {
        success: true,
        message: 'Updated successfully',
        result: all
    };
});
