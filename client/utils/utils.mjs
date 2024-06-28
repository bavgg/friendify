import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return false;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // current time in seconds
  
      return decodedToken.exp >= currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

export function getDecodedAuthToken() {
  const token = localStorage.getItem('authToken');
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Invalid token:', error);
  }
}