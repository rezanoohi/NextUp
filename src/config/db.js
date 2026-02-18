import {Pool} from 'pg';
import {DB_URL} from "./env.js";

export const pool = new Pool({
    connectionString: DB_URL
});

