import { projectModel } from "~~/server/mongodb";
export default defineEventHandler(async (event) => {
  const all = await projectModel.find();
  return {
    statusCode: 200,
    result: all,

  };
});
