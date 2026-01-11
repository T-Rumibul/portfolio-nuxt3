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
    const { icon, name, link } = body;

    if (!icon || !name || !link) {
        return {
            success: false,
            message: 'All fields are required',
        }
    }
    const all = await contactModel.create({
        icon,
        name,
        link
    });
    await all.save()
    return {
        success: true,
        message: 'Created successfully',
        result: all
    };
});

