import { client } from "../database.config.mjs";

export async function fetch_posts(user_id) {
  const query = `
    SELECT
    users.id AS user_id,
    posts.id AS post_id,
    CONCAT(users.firstname, ' ', users.lastname) AS fullname,
    posts.content,
    COUNT(likes.id) AS like_count,
      CASE
          WHEN EXISTS (
              SELECT 1
              FROM likes
              WHERE likes.post_id = posts.id AND likes.user_id = ${user_id}
          ) THEN TRUE
          ELSE FALSE
      END AS is_liked 
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON likes.post_id = posts.id
    GROUP BY users.id, posts.id
    ORDER BY posts.created_at DESC
  `;

  const result = await client.query(query);
  // console.log(result.rows);
  
  return result.rows;
}
// fetch_posts();

// SELECT 
//     CONCAT(users.firstname, ' ', users.lastname) AS fullname, 
//     posts.content,
//     COUNT(likes.id) AS like_count
// FROM 
//     posts
// JOIN 
//     users ON posts.user_id = users.id
// LEFT JOIN 
//     likes ON likes.post_id = posts.id
// GROUP BY 
//     posts.id, users.firstname, users.lastname, posts.content;

