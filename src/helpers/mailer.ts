import User from "@/models/user.model";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
export const senEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = uuidv4();
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set:{
          verifyToken: token,
          verifyExpires: Date.now() + 3600000,
        }
        
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set:{
          forgotPasswordToken: token,
          forgotPasswordExpires: Date.now() + 3600000,
        }
      
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dreamcreation.help@gmail.com",
        pass: "tfnmogfyspxajmsb",
      },
    });

    const MailOptions = {
      from: "ayushsolanki2901@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset your Password",
      html: `
      <h1>Hello We are here for your Help</h1>
      <p>Please click on the following link to ${
        emailType === "VERIFY" ? "verify" : "reset"
      } your email</p>
      <a href="${process.env.DOMAIN!}/verifyemail?token=${token}">
       ${emailType === "VERIFY" ? "verify" : "reset"} </a>
       <br/>
       <p>This link will expire in 1 hour.</p>
       <p>${process.env.DOMAIN!}/verifyemail?token=${token}</p>
      
      `,
    };
    const mailResponse = await transporter.sendMail(MailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
