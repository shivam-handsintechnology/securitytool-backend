

const jwt = require('jsonwebtoken');

console.log(jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh'))