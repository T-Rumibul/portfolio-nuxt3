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
    const { projectData } = body;
   
    if(!projectData) {
        return {
            success: false,
            message: 'Project data is required'
        }
    }
  

    const project = new projectModel(projectData)
    const errors =project.validateSync();
    if(errors){
        return {
            success: false,
            message: `Invalid project data ${errors.message}`
        }
    }
  const newProject = await projectModel.findByIdAndUpdate(
    projectData._id, projectData 
);

if(!newProject){
    return { success: false, message: 'Failed to update Project ' };
}
if(projectData.git === undefined) {
    newProject!.git = undefined;
    await newProject!.save();
}
if(projectData.link === undefined) {
    newProject!.link = undefined;
    await newProject!.save();
}
return { success: true, message: 'Project updated successfully', result: newProject };
});
