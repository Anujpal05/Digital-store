import nodemailer from "nodemailer";

export const sendMail = (email, username, password) => {
  try {
    //Creating Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER,
        pass: process.env.PASSKEY,
      },
    });

    //Mail Options
    const mailOptions = {
      from: `"PixelMart" ${process.env.SENDER}`,
      to: email,
      subject: " Welcome to PixelMart! Here's Your Account Details",
      html: `<h2>Dear ${username ? username : "User"},</h2>

        <p>Thank you for registering with PixelMart. We are excited to have you on board!</p>

        <p>Below are your login credentials:</p>

        <p>Username: <span style = 'color:gray; font-style:bold;'>${
          username ? username : "User"
        }</span></p>
        <p>Password: <span style = 'color:gray; font-style:bold;'>${password}</span></p>
        <p>You can log in to your account here: <span style = 'color:blue';>https://digital-store-ecommerce.netlify.app/</span>.</p>

        <p>For your security, we recommend changing your password after your first login. If you have any issues or need assistance, feel free to contact our support team at <span style = 'color : blue' > ajpal7141@gmail.com </span> .</p>

        <p>Best regards,</p>
        <h4>The PixelMart Team </h4>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail sent successfully!");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
