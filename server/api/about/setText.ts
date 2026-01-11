import { aboutModel } from "../../mongodb";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { code, name, position, description, accessToken } = body;
    if(!accessToken) {
        return {
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }
    }
    if(!code) {
        return {
            statusCode: 400,
            statusMessage: 'Language code is required'
        }
    }
    if(!name || !position || !description) {
        return {
            statusCode: 400,
            statusMessage: 'All fields are required'
        }
    }
  const isValid = verifyJWT(accessToken);
   if (!isValid) {
        return { statusCode: 401, statusMessage: 'Unauthorized' };
    }
  const newAbout = await aboutModel.findByIdAndUpdate(
  code,
  {
    name,
    position,
    description,
  },
  { upsert: true, new: true }  // ensures creation if not found
);
if(!newAbout){
    return { statusCode: 500, statusMessage: 'Failed to update About section' };
}
return { statusCode: 200, statusMessage: 'About section updated successfully' };
});
