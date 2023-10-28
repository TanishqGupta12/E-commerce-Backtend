
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  // Create a transporter object to send emails
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
      auth: {
          user: 'happeningsoulsstore@gmail.com',
          pass: 'ukdpeijcokgpuqho'
      }
  });
  
  // Set up the email options
  const mailOptions = {
      from: 'happeningsoulsstore@gmail.com',
      to: options.Email,
      subject: options.subject,
      text: options.message
  };
  
  // Send the email using the transporter object
  transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        alert('Email sent: ' + info.response);
      } 

  });
};

module.exports = sendEmail;
