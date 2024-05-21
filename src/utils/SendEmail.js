const nodemailer = require('nodemailer');
const { email, password } = require('../config/email');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});
const SendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: email,
      to,
      subject,
      text,
      html
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};
module.exports = { SendEmail };