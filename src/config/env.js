try {
    process.loadEnvFile('.env');
} catch (err) {}

export const {PORT, DB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN} = process.env