import type { H3Event, EventHandlerRequest } from 'h3';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { refreshTokenModel } from '../mongodb';
export const validateTurnstileToken = async (token: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secret: config.turnstile.secret,
            response: token,
        }),
    });
    const data = await response.json();
    return data;
}

export const verifyJWT = async(token: string) => {
    const config = useRuntimeConfig();
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if(!decoded) return false;
        const isValid = await compareHashedValue(config.admin.username, (decoded as any).username);
        if(!isValid) return false;
        return true;
    } catch (err) {
        return false;
    }
}

export const generateJWT = async () => {
    const config = useRuntimeConfig();
    const hashedUsername = await hashValue(config.admin.username);
    const token = jwt.sign({ username: hashedUsername }, config.jwtSecret, { expiresIn: '1h' });
    return token;
}
export const generateRefreshToken = () => {
    const token = uuidv4();
    return token;
}


export const hashValue = async (value: string): Promise<string> => {
    const saltRounds = 12;
    const hashedValue = await bcrypt.hash(value, saltRounds);
    return hashedValue;
}

export const compareHashedValue = async (value: string, hashedValue: string): Promise<boolean> => {
    const match = await bcrypt.compare(value, hashedValue);
    return match;
}

export const verifyRefreshToken = async (token: string, username: string) => {
    const entry = await refreshTokenModel.findOne({ token });
    if (!entry) {
        return false;
    }

    const isValidUsername = await compareHashedValue(entry.username, username);
    if (!isValidUsername) {
        return false;
    }
    return true;
}

export const verifyAuth = async (event: H3Event<EventHandlerRequest>) => {
    const accessToken = event.headers.get('access-token');
    const refreshToken = event.headers.get('refresh-token');
    const username = event.headers.get('username');
    const config = useRuntimeConfig();

    if (!accessToken || !username ) {
        return false;
    }
    const isValidUsername = await compareHashedValue(config.admin.username, username);
    if (!isValidUsername) {
        return false;
    }

    const isValid = await verifyJWT(accessToken);
    if (!isValid) {
        if (!refreshToken) {
            return false;
        }
        const refreshIsValid = await verifyRefreshToken(refreshToken, username);
        
        if (!refreshIsValid) {
            return false;
        }
        const newAccessToken = await generateJWT();
        event.node.res.setHeader('access-token', newAccessToken);
        return true;
    }
    return true;
}