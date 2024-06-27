import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import { authenticate, register, saveCartItems } from './lib/actions.mjs';
import { insertUser } from '../db/lib/actions.mjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { lookup } from 'dns';
// import { lookup } from 'dns';

dotenv.config();

async function generateJWToken(user, secret_key) {
  const token = jwt.sign({ email: user.email }, secret_key, {
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

// app.post('/user/authenticate', async (req, res) => {
  
//   const email = req.body.email;
//   const password = req.body.password;

//   const result = await authenticate(email, password);
//   if (result.success) {
//     const token = await generateJWToken(result.user); 
//     res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });
//     res.cookie('user_id', result.user.id, { maxAge: 3600000, httpOnly: true });

//     return res.status(201).json({ success: true, message: "User signed in successfully", token });
//   } else {
//     return res.status(401).json({ success: false, message: result.message });
//   }
// });

app.post('/user/register', async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  

  // db query
  const result = await insertUser({ firstname, lastname, email, password });
  
  if (result.id !== undefined) {
    const token = await generateJWToken(result, process.env.SECRET_KEY); 
    return res.status(201).json({ success: true, message: "User signed in successfully", token });
  } else {
    return res.status(401).json({ success: false, message: result.message });
  }
});

// app.post('/user/cart/save', async (req, res) => {
//   const { cartItems } = req.body;
//   const user_id = req.cookies.user_id;

//   const result = await saveCartItems(cartItems, user_id);
//   if (result.success) {
//     res.clearCookie('authToken', { httpOnly: true });
//     res.clearCookie('user_id', { httpOnly: true });

//     // return res.status(201);
//     // return res.redirect('/');
//     return res.status(201).json({ success: false, message: result.message });
//     return res.status(401).json({ success: false, message: result.message });
//   }

// });

app.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});