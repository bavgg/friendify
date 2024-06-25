import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { authenticate, register, saveCartItems } from './lib/actions.mjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function generateJWToken(user) {
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign({ user_id: user.id }, secretKey, {
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
app.use(express.static(join(__dirname, "public")));

app.post('/user/authenticate', async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  const result = await authenticate(email, password);
  if (result.success) {
    const token = await generateJWToken(result.user); // Assuming you have a token generation function
    res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });
    res.cookie('user_id', result.user.id, { maxAge: 3600000, httpOnly: true });

    return res.status(201).json({ success: true, message: "User signed in successfully", token });
  } else {
    return res.status(401).json({ success: false, message: result.message });
  }
});

app.post('/user/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const result = await register({ email, password, username });
  if (result.success) {
    const token = await generateJWToken(result.user); // Assuming you have a token generation function
    res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });
    res.cookie('user_id', result.user.id, { maxAge: 3600000, httpOnly: true });
    
    return res.status(201).json({ success: true, message: "User signed in successfully", token });
  } else {

    return res.status(401).json({ success: false, message: result.message });
  }
});

app.post('/user/cart/save', async (req, res) => {
  const { cartItems } = req.body;
  const user_id = req.cookies.user_id;

  const result = await saveCartItems(cartItems, user_id);
  if (result.success) {
    res.clearCookie('authToken', { httpOnly: true });
    res.clearCookie('user_id', { httpOnly: true });

    // return res.status(201);
    // return res.redirect('/');
    return res.status(201).json({ success: false, message: result.message });
  } else {
    return res.status(401).json({ success: false, message: result.message });
  }

});

app.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});