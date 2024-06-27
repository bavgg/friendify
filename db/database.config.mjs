import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

const pgConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false // For self-signed certificates or when you don't need certificate verification
    }
};

export const client = new Client(pgConfig);

try {
  await client.connect();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Error connecting to database", error);
}


// const testQuery = `
//   SELECT * FROM users
// `;

// const result = await client.query(testQuery);
// console.log(result.rows[0]);