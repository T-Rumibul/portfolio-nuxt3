import { aboutModel } from "../../mongodb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { code } = body;
 
  if (!code) {
    return {
      statusCode: 400,
      statusMessage: 'Language code is required',
      result: {
        name: "",
        position: "",
        description: "",
      }
    }
  }
  const all = await aboutModel.findById(code);
  if (all === null) {
    return {
      statusCode: 404,
      statusMessage: 'About section not found',
      result: {
        name: "",
        position: "",
        description: "",
      }
    }
  }
  return {
    statusCode: 200,
    statusMessage: 'About section retrieved successfully',
    result: {
      name: all.name,
      position: all.position,
      description: all.description,
    }
  };
});
