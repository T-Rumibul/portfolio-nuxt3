import { IAuthVerifyResponse } from "~~/typing";

export default defineEventHandler(async (event): Promise<IAuthVerifyResponse> => {
   const verification = event.context.auth;
   if(!verification) return {
        success: false
    };
   return {
         success: true
   };
    
});
