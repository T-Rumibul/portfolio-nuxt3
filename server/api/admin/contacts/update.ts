import { contactModel } from "~~/server/mongodb";
import { APIResponse, IContact } from "~~/typing";

export default defineEventHandler(async (event): Promise<APIResponse<IContact>> => {
        if(event.context.auth !== true) {
        return {
            success: false,
            message: 'Unauthorized',
        }
    }
    const body = await readBody(event);
    const { _id, icon, name, link } = body;
    if (!_id || !icon || !name || !link) {
        return {
            success: false,
            message: 'All fields are required',
        }
    }

    const all = await contactModel.findByIdAndUpdate(_id, {
        icon,
        name,
        link
    });
    if(!all) {
        return {
            success: false,
            message: 'Not found',
        };
    }
   await all.save()
    return {
        success: true,
        message: 'Updated successfully',
        result: all
    };
});
