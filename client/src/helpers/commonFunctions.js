import CryptoJS from "crypto-js";
export const SecretKey = 'Dsererweqeqqwwqe'
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SecretKey).toString();
}
export const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, SecretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}