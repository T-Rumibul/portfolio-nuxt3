import { projectModel } from "~~/server/mongodb";
import type { APIResponse, IProject } from "~~/typing";
export default defineEventHandler(async (event): Promise<APIResponse<IProject[]>> => {
  const all = await projectModel.find();
  if (all === null) {
    return {
      success: false,
      message: 'Projects not found',
    };
  }
  return {
    success: true,
    result: all,
    message: 'Projects fetched successfully',

  };
});
