// utils/generateActivationCode.js
const crypto = require('crypto');

function generateActivationCode(length = 20) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = { generateActivationCode };
