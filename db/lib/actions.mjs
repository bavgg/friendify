import bcrypt from "bcrypt";
import { client } from "../database.config.mjs";
import { timeNow } from "./utils.mjs";

async function verifyPassword(password, hash) {
  const is = await bcrypt.compare(password, hash);
  return is;
}

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function insert_user(user) {
  try {
    // console.log({ first: user.firstname, last: user.lastname, email: user.email });
    
    const hashed_password = await hashPassword(user.password);
    const last_login = timeNow();

    const query =
      "INSERT INTO users (firstname, lastname, email, password_hash, last_login) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [user.firstname, user.lastname, user.email, hashed_password, last_login];

    const result = await client.query(query, values);
    // console.log(result.rows[0]);
    
    return result.rows[0]; // Return the inserted user
  } catch (err) {
    console.error("Error inserting user:", err);
    return { error: err.message }; 
  } 
} 


export async function verify_user(email, password) {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(query, [email]);

    const user = result.rows[0];

    if (user) {
      const isPasswordValid = await verifyPassword(password, user.password_hash);
      if (isPasswordValid) {
        return user;
      } 
    }
  } catch (error) {
    console.error('Error during authentication:', error);
  }
}

export async function insert_post(user_id, content) {
  try {
    const query =
      "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *";
    const values = [user_id, content];

    const result = await client.query(query, values);
    // console.log(result.rows[0]);
    
    return result.rows[0]; // Return the inserted user
  } catch (err) {
    console.error("Error inserting post:", err);
    return { error: err.message }; 
  } 
} 
// insert_post(17, 'test');

export async function insert_like(user_id, post_id) {
  try {
    const query =
      "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *";
    const values = [user_id, post_id];

    const result = await client.query(query, values);
    
    return result.rows[0]; // Return the inserted user
  } catch (err) {
    console.error("Error inserting likes:", err);
    return { error: err.message }; 
  } 
} 

export async function remove_like(user_id, post_id) {
  
  try {
    const query =
      "DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *";
    const values = [user_id, post_id];

    const result = await client.query(query, values);
    console.log(result.rows[0]);
    
    return result.rows[0]; // Return the removed like
  } catch (err) {
    console.error("Error removing like:", err);
    return { error: err.message }; 
  } 
}


// insert_like(17, 2);