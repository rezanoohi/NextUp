import crypto from "node:crypto";

export const refreshTokenHash = (refreshToken) => {
    return crypto.createHash('sha256').update(refreshToken).digest('hex');
}