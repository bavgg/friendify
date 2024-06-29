import { client } from "../database.config.mjs";

export async function fetch_posts() {
  const query = `
    SELECT 
      users.id AS user_id, 
      posts.id AS post_id, 
      likes.id AS like_id, 
      CONCAT(users.firstname, ' ', users.lastname) AS fullname, 
      posts.content
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON likes.post_id = posts.id
    ORDER BY posts.created_at DESC
    ;
  `;

  const result = await client.query(query);
  console.log(result.rows);
  
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

