
import { compareHashedValue } from "~~/server/utils";
import { refreshTokenModel } from "../../mongodb";
import { APIResponse, ILoginResponse } from "~~/typing";

const REFRESH_ID = 'singleton';
const REFRESH_EXPIRY_DAYS = 30;

const failed = (message: string): { message: string, success: false } => {
  return { message, success: false};
}


export default defineEventHandler(async (event) : Promise<APIResponse<ILoginResponse>> => {
  const body = await readBody(event);
  const { username, password, token } = body;
 
  const config = useRuntimeConfig();
  
   if(typeof username !== 'string' || typeof password !== 'string' || typeof token !== 'string') {
    return failed('Invalid request');
  }
  const turnstileResponse = await validateTurnstileToken(token);
  if (!turnstileResponse.success) {
    return failed('Turnstile verification failed');
  }
  if (username !== config.admin.username) {
    return failed('Unauthorized');
  }
  const passwordMatch = await compareHashedValue(password, config.admin.password);
  if (!passwordMatch) {
    return failed('Unauthorized');
  }

  const accessToken = await generateJWT();
  const refreshToken = generateRefreshToken();
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + REFRESH_EXPIRY_DAYS); // Refresh token valid for 30 days
  const hashedUsername = await hashValue(username);
  await refreshTokenModel.deleteMany({ username: config.admin.username });
  const tokenDoc = await refreshTokenModel.create({ _id: REFRESH_ID, token: refreshToken, username, validUntil });
  tokenDoc.save();
  return {
    message: 'Login successful',
    success: true,
    result: {
      accessToken,
      refreshToken,
      username: hashedUsername,
    }
  };
});

