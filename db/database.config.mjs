import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

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