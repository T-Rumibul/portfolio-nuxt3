import { projectModel } from "../../mongodb";
export default defineEventHandler(async (event) => {
  const all = await projectModel.find();
  return {
    ...all,
  };
});
