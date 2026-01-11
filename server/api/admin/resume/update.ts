import { resumeModel } from "~~/server/mongodb";
import type { APIResponse, IResumeLocalized } from "~~/typing";

const ID = 'singleton';
export default defineEventHandler(async (event): Promise<APIResponse<IResumeLocalized>> => {
    const body = await readBody(event);
    const { data } = body;
      if(event.context.auth !== true) {
        return {
            success: false,
            message: 'Unauthorized',
        }
    }
    if(!data) {
        return {
            success: false,
            message: 'Data is required'
        }
    }
    const resumeTest = new resumeModel(data)
    const errors =resumeTest.validateSync();
    if(errors){
        return {
            success: false,
            message: `Invalid resume data ${errors.message}`
        }
    }
  const resume = await resumeModel.findByIdAndUpdate(
  ID,
  data
);
if(!resume){
    return { success: false, message: 'Failed to update resume' };
}
await resume.save()
return { success: true, message: 'About section updated successfully', result: resume };
});
