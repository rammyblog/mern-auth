// const nodemailer = require("nodemailer");

// const sendEmail = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: options.to,
//     subject: options.subject,
//     html: options.text,
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };

const sgMail = require("@sendgrid/mail");

const sendEmail = async (emailOptions) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    await sgMail.send(emailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
