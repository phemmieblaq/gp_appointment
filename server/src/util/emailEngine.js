const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

exports.EmailSender = async (
  subject,
  payload,
  recipientEmail,
  senderEmail,
  template
) => {
  try {
    //creating transporter
    const transporter = nodemailer.createTransport({
      port: parseInt(process.env.MAIL_PORT), // true for 465, false for other ports
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
      secure: true,
    });

    const requiredPath = path.join(__dirname, template);

    const data = await ejs.renderFile(requiredPath, payload);

    const mailOptions = () => {
      return {
        from: senderEmail,
        to: recipientEmail,
        subject: subject,
        html: data,
      };
    };

    //send email
    transporter.sendMail(mailOptions(), (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    // return error;
    console.log(error);
  }
};
