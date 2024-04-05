const CryptoJS = require('crypto-js');

// Function to generate random passwords
function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Function to generate random keys for different key sizes
function generateRandomKey(keySize) {
    let key = '';
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    for (let i = 0; i < keySize / 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        key += charset[randomIndex];
    }
    return key;
}

// Generate random passwords and encrypt with different AES key sizes
const numberOfPasswords = 10;
const passwordLength = 12;
const encryptedPasswords = [];

[128, 192, 256].forEach(keySize => {
    for (let i = 0; i < numberOfPasswords; i++) {
        const password = generateRandomPassword(passwordLength);
        const key = generateRandomKey(keySize);
        const encrypted = CryptoJS.AES.encrypt(password, key).toString();
        encryptedPasswords.push({ keySize, password, key, encrypted });
    }
});

// Example usage
console.log(encryptedPasswords);
