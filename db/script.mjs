import { client } from "./database.config.mjs";

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    profile_picture VARCHAR(255)
  );
`;

const createCartItemsTableQuery = `
  CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * price) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const executeQuery = (query, description, callback) => {
  client.query(query, (err, res) => {
    if (err) {
      console.error(`${description} query error`, err.stack);
    } else {
      console.log(`${description} query result:`, res.rows);
    }
    // If a callback function is provided, call it
    if (callback) {
      callback();
    }
  });
};

// Function to create the users table
const createUsersTable = (callback) => {
  executeQuery(createUsersTableQuery, 'Create Users Table', callback);
};

// Function to create the cart items table
const createCartItemsTable = (callback) => {
  executeQuery(createCartItemsTableQuery, 'Create Cart Items Table', callback);
};

// Initialize the connection and start creating the users table
// createUsersTable(() => {
//   createCartItemsTable(() => {
//     // End the client connection after all queries are done
//     client.end();
//   });
// });

const testQuery = `
  SELECT * FROM users
`;

// const testQuery = `
// SELECT column_name, data_type
//   FROM information_schema.columns
//   WHERE table_name = 'users' AND table_schema = 'public';
// `;

// executeQuery(testQuery, 'Test query');

// Execute the query
async function main() {
    const result = await client.query(testQuery);
    console.log(result.rows[0]);
}

main();
