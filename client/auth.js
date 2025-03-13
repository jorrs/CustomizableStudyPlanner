const crypto = require('crypto');
const env = {
    SECRET_KEY: 'your-secret-key', // Ensure this is kept secure and unique for production
};

const UsersDatabase = new Map();

function hashUserPassword(password) {
    return crypto.createHmac('sha256', env.SECRET_KEY).update(password).digest('hex');
}

function generateUserToken() {
    return crypto.randomBytes(64).toString('hex');
}

function registerUser(username, password) {
    if (!username || !password) {
        console.log('Username and password are required');
        return;
    }
    if (UsersDatabase.has(username)) {
        console.log('User already exists');
        return;
    }
    const hashedPassword = hashUserPassword(password);
    UsersDatabase.set(username, { password: hashedPassword, token: null });
    console.log('User registered successfully');
}

function loginUser(username, password) {
    if (!UsersDatabase.has(username)) {
        console.log('User does not exist');
        return;
    }
    const user = UsersDatabase.get(username);
    const hashedPassword = hashUserPassword(password);
    if (user.password === hashedPassword) {
        const token = generateUserToken();
        user.token = token;
        console.log('Login successful', { username, token });
        return { username, token };
    } else {
        console.log('Incorrect password');
        return;
    }
}

function verifyUserAuthentication(username, token) {
    if (!UsersDatabase.has(username)) {
        console.log('User does not exist');
        return false;
    }
    const user = UsersDatabase.get(username);
    if (user.token === token) {
        console.log('User is authenticated');
        return true;
    } else {
        console.log('User is not authenticated');
        return false;
    }
}

module.exports = { 
    hashPassword: hashUserPassword, 
    generateToken: generateUserToken, 
    register: registerUser, 
    login: loginUser, 
    isAuthenticated: verifyUserAuthentication 
};