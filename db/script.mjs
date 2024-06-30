import { client } from "./database.config.mjs";
function deleteTable(table) {
  const query = `
    DROP TABLE ${table};
  `;
  executeQuery(query, `Delete ${table} Table`);
}
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;



const createLikesTableQuery = `
  CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id) -- Ensures a user can like a post only once
  );
`;
const createCommentsTableQuery = `
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
  );f
`;

const executeQuery = (query, callback) => {
  client.query(query, (err, res) => {
    if (err) {
      console.error(`query error`, err.stack);
      
    } else {
      console.table( res.rows);
      // client.end();
    }
    // If a callback function is provided, call it
    if (callback) {
      callback();
    }
  });
};
// deleteTable('likes');


function query() {
//   const query = `
//   SELECT
//     *
//   FROM posts
//   JOIN users ON posts.user_id = users.id
//   LEFT JOIN likes ON likes.post_id = posts.id
//   ORDER BY posts.created_at DESC
// `;
//   executeQuery(query);

  // const query4 = `
  // SELECT
  //   *
  // FROM users
  // `;
  // executeQuery(query4);

  // const query2 = `
  // SELECT
  //   *
  // FROM posts
  // LIMIT 10
  // `;
  // executeQuery(query2);

  const query22 = `
  
  DELETE FROM posts;


  `;
  executeQuery(query22);


  // const query3 = `
  // SELECT
  //   users.id AS user_id,
  //   posts.id AS post_id,
  //   CONCAT(users.firstname, ' ', users.lastname) AS fullname,
  //   posts.content,
  //   COUNT(likes.id) AS like_count,
  //     CASE
  //         WHEN EXISTS (
  //             SELECT 1
  //             FROM likes
  //             WHERE likes.post_id = posts.id AND likes.user_id = 17
  //         ) THEN TRUE
  //         ELSE FALSE
  //     END AS is_liked 
  //   FROM posts
  //   JOIN users ON posts.user_id = users.id
  //   LEFT JOIN likes ON likes.post_id = posts.id
  //   GROUP BY users.id, posts.id
  //   ORDER BY posts.created_at DESC
  // `;
  // executeQuery(query3);

}
query();






