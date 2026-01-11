import { Schema, model } from "mongoose";
import type { IRefreshToken } from '../../typing';


const refreshToken = new Schema<IRefreshToken>({
    _id: { type: String, required: true },
    token: { type: String, required: true },
    username: { type: String, required: true },
    validUntil: { type: Date, required: true },
});

export const refreshTokenModel = model("refreshToken", refreshToken);