import {pool} from "./db.js";

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users
            (
                id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email         TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                name          TEXT,
                age           INT CHECK ( age > 0 AND age <= 150 ),
                created_at    TIMESTAMP        DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos
            (
                id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id     UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
                title       TEXT NOT NULL,
                description TEXT,
                is_done     BOOL             DEFAULT false,
                created_at  TIMESTAMP        DEFAULT now()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS refresh_tokens
            (
                id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id       UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
                device_id     UUID NOT NULL,
                refresh_token TEXT NOT NULL UNIQUE,
                user_agent    TEXT NOT NULL,
                created_at    TIMESTAMP        DEFAULT NOW()
            );
        `);

        console.log('[PostgreSQL] Database initialized successfully')
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}