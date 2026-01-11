import { skillsModel } from "~~/server/mongodb";

export default defineEventHandler(async (event) => {

  const all = await skillsModel.find();
  if (!all) {
    return {
      statusCode: 404,
      statusMessage: 'Skills not found',
      result: []
    }
  }
  return {
    statusCode: 200,
    statusMessage: 'Skills retrieved successfully',
    result: all
  };
});