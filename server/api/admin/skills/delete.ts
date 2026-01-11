import { skillsModel } from "~~/server/mongodb";
import { APIResponse, ISkillCat } from "~~/typing";

export default defineEventHandler(async (event): Promise<APIResponse<null>> => {
        if(event.context.auth !== true) {
        return {
            success: false,
            message: 'Unauthorized',
        }
    }
    const body = await readBody(event);
    const {  _id } = body;
    if (!_id) {
        return {
            success: false,
            message: 'All fields are required',
        }
    }
   
    const all = await skillsModel.findByIdAndDelete(_id)
    if(!all) {
         return {
        success: false,
        message: 'Not found',
    };
    }
    return {
        success: true,
        message: 'Deleted successfully',
        result: null
        
    };
});
