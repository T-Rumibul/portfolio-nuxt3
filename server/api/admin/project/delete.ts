import { projectModel } from "~~/server/mongodb";
import { APIResponse, IProject } from "~~/typing";

export default defineEventHandler(async (event): Promise<APIResponse<IProject>> => {
        if(event.context.auth !== true) {
        return {
            success: false,
            message: 'Unauthorized',
        }
    }
    const body = await readBody(event);
    
    const { _id} = body;
    
    if(!_id) {
        return {
            success: false,
            message: 'Project data is required',
        }
    }


    

    

const project = await projectModel.findByIdAndDelete(_id);
if(!project) {
    return {
        success: false,
        message: 'Not found',
    };
}
return { success: true, message: 'Project created successfully', result: project };
});
