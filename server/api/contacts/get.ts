import { contactModel } from "~~/server/mongodb";

export default defineEventHandler(async (event) => {

  const all = await contactModel.find();
  if (!all) {
    return {
      statusCode: 404,
      statusMessage: 'Contacts not found',
      result: [] as typeof all
    }
  }
  return {
    statusCode: 200,
    statusMessage: 'Contacts retrieved successfully',
    result: all
  };
});
