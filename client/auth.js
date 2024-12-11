const UsersDB = new Map();
const env = {
  SECRET_KEY: 'your-secret-key',
};
const crypto = require('crypto');
function hashPassword(password) {
  return crypto.createHmac('sha256', env.SECRET_KEY).update(password).digest('hex');
}
function generateToken() {
  return crypto.randomBytes(64).toString('hex');
}
function register(username, password) {
  if (!username || !password) {
    console.log('Username and password are required');
    return;
  }
  if (UsersDB.has(username)) {
    console.log('User already exists');
    return;
  }
  const hashedPassword = hashPassword(password);
  UsersDB.set(username, { password: hashedPassword, token: null });
  console.log('User registered successfully');
}
function login(username, password) {
  if (!UsersDB.has(username)) {
    console.log('User does not exist');
    return;
  }
  const user = UsersDB.get(username);
  const hashedPassword = hashPassword(password);
  if (user.password === hashedPassword) {
    const token = generateToken();
    user.token = token;
    console.log('Login successful', { username, token });
    return { username, token };
  } else {
    console.log('Incorrect password');
    return;
  }
}
function isAuthenticated(username, token) {
  if (!UsersDB.has(username)) {
    console.log('User does not exist');
    return false;
  }
  const user = UsersDB.get(username);
  if (user.token === token) {
    console.log('User is authenticated');
    return true;
  } else {
    console.log('User is not authenticated');
    return false;
  }
}