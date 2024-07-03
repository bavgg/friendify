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
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL
  );
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

  // const query22 = `
  
  // SELECT c.comment_id, c.content, c.user_id, u.firstname, u.lastname, c.post_id, p.content AS post_content
  // FROM comments c
  // JOIN users u ON c.user_id = u.id
  // JOIN posts p ON c.post_id = p.id
  // ORDER BY c.post_id, c.comment_id;


  // `;
  // executeQuery(query22);


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

  const query3 = `
        select
            u.firstname || ' ' || u.lastname as fullname,
            p.post_id,
            p.user_id,
            p."content",
            count(distinct l.like_id) as like_count,
            json_agg (
                json_build_object (
                    'comment_id',
                    c.comment_id,
                    'comment_content',
                    c.content,
                    'comment_user_id',
                    u.user_id,
                    'comment_user_name',
                    CONCAT (u.firstname, ' ', u.lastname)
                )
            ) filter (
                where
                    c.comment_id is not null
            ) as comments,
            case
                when exists (
                    select
                        1
                    from
                        likes l
                    where
                        l.post_id = p.post_id
                        and l.user_id = 17
                ) then true
                else false
            end as is_liked
        from
            posts p
            left join "comments" c on p.post_id = c.post_id
            join users u on u.user_id = p.user_id
            left join likes l on l.post_id = p.post_id
        group by
            u.user_id,
            p.post_id
        order by
            p.created_at desc
  `;
  executeQuery(query3);

}
query();






