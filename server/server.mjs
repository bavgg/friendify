import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { insert_user, verify_user, insert_post, insert_like } from '../db/lib/actions.mjs';
import { fetch_posts } from '../db/lib/data.mjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function generateJWToken(user, secret_key) {
  const token = jwt.sign( user, secret_key, {
    expiresIn: '1h',
  });
  return token;
}

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectPath = __dirname.substring(0, __dirname.indexOf('/fbclone/') + 8);

app.use(express.static(join(projectPath, "client")));

app.post('/user/authenticate', async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  const result = await verify_user(email, password);
  if (result !== undefined) {
    const token = await generateJWToken(result, process.env.SECRET_KEY); 

    return res.status(201).json({ success: true, message: "User signed in successfully", token });
  } else {
    return res.status(401).json({ success: false, message: result.message });
  }
});

app.post('/user/register', async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  // db query
  const result = await insert_user({ firstname, lastname, email, password });
  
  if (result.id !== undefined) {
    const token = await generateJWToken(result, process.env.SECRET_KEY); 
    return res.status(201).json({ success: true, message: "User signed in successfully", token });
  } else {
    return res.status(401).json({ success: false, message: result.message });
  }
});

app.post('/add-post', async (req, res) => {
  const user_id = req.body.user_id;
  const content = req.body.content;

  const result = await insert_post(user_id, content);
  if (result.id !== undefined) {
    return res.status(201).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

app.post('/add-like', async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;

  const result = await insert_like(user_id, post_id);
  if (result.id !== undefined) {
    return res.status(201).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

app.get('/posts', async (req, res) => {
  // const { friend } = req.query; 

  const result = await fetch_posts();
  // console.log(result);
  

  if(result !== undefined && result.length !== 0){
    return res.status(201).json(result);
  }else {
    return res.status(401);
  }
});


app.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});