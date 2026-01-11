export default defineEventHandler(async(event) => {
  if(event.path.includes('/admin') && !event.path.includes('/admin/login')) {
    
  const verification = await verifyAuth(event);
  event.context.auth = verification;
   }
})