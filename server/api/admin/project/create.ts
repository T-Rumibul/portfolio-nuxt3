import { projectModel } from "~~/server/mongodb";
import { APIResponse, IProject } from "~~/typing";

export default defineEventHandler(async (event): Promise<APIResponse<IProject>> => {
        if(!event.context.auth) {
        return {
            success: false,
            message: 'Unauthorized',
        }
    }
    const body = await readBody(event);
    
    const { projectData} = body;
    
    if(!projectData) {
        return {
            success: false,
            message: 'Project data is required',
        }
    }


    const project = new projectModel(projectData)
    const errors =project.validateSync();
    if(errors){
        return {
            success: false,
            message: `Invalid project data ${errors.message}`,
        }
    }
    
    await project.save();
return { success: true, message: 'Project created successfully', result: project };
});
