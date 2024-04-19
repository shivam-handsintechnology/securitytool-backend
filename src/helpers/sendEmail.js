module.exports = async function sendEmail(to, subject, text) {
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth
            : {
            user: 'shivam@handsintechnology.com',
            pass: 'Shivam@123'
        }
    });
    let mailOptions = {
        from: 'shivam@handsintechnology.com',
        to: to,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return error
        } else {
            return "Email Sent"+info.response
        }
    });
}