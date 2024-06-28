import { client } from "../database.config.mjs";

export async function fetch_posts() {
  const query = `
    SELECT CONCAT(users.firstname, ' ', users.lastname) AS fullname, posts.content
    FROM posts
    JOIN users ON posts.user_id = users.id;
  `;

  const result = await client.query(query);
  console.log(result.rows);
  
  return result.rows;
}
