import { client } from "../database.config.mjs";

export async function fetchPostsByUserId(id) {
    const query =
      "SELECT * FROM posts WHERE user_id = $1";
    const values = [id];

    const result = await client.query(query, values);
    console.log(result.rows);
    
}
fetchPostsByUserId(17);
