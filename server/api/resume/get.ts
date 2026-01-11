import { resumeModel } from "~~/server/mongodb";
import { APIResponse, IResumeLocalized } from "~~/typing";

const ID = 'singleton';
export default defineEventHandler(async (event): Promise<APIResponse<IResumeLocalized>>  => {
  const all = await resumeModel.findById(ID);
  if (all === null) {
    const placeholder = {
      name: 'Your Name',
      position: 'Your Position',
      aboutme: 'A brief description about yourself.',
    }
    const newResume = new resumeModel({ _id: ID, en: placeholder, ru: placeholder, uk: placeholder });
    await newResume.save();
    return {
      success: true,
      message: 'Resume fetched successfully',
      result: newResume
    };
  }
  return {
    success: true,
    message: 'Resume fetched successfully',
    result: all
  };
});
