import { client } from "./database.config.mjs";

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) UNIQUE NOT NULL,
    lastname VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    last_login TIMESTAMP,
  );
`;

const createPostsTableQuery = `
  CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
  );
`;
const deletePostsTableQuery = `
  DROP TABLE posts;
`;

const createLikesTableQuery = `
  CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id) -- Ensures a user can like a post only once
  );
`;

const createCommentsTableQuery = `
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
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

// // Function to create the users table
// const createUsersTable = (callback) => {
//   executeQuery(deletePostsTableQuery, 'Create Users Table', callback);
// };

// // Function to create the cart items table
// const createCartItemsTable = (callback) => {
//   executeQuery(createCartItemsTableQuery, 'Create Cart Items Table', callback);
// };

executeQuery(deletePostsTableQuery, 'Delete Posts Table');






