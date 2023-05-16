import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "savion34@ethereal.email",
    pass: "zxUfCDYDb8kJPPJ372",
  },
});

async function sendMailRegister() {
  const mailOptRegister = {
    from: "roma.tremblay59@ethereal.email",
    to: "roma.tremblay59@ethereal.email",
    subject: "Nuevo Usuario Registrado",
    html: '<h1 style="color: blue;">Nuevo usario registrado <span style="color: green;"> Usuario</span></h1>',
  };
  try {
    const info = await transporter.sendMail(mailOptRegister);

    console.log(info);
  } catch (err) {
    throw new Error(err);
  }
}
async function sendMailCartPurchased(userName, userMail, userCart) {
  try {
    const mailOptCartPurchased = {
      from: "savion34@ethereal.email",
      to: "savion34@ethereal.email",
      subject: `Nuevo pedido de : ${userName} ${userMail} `,
      html: `<h3 style="color: blue;">Nuevo carrito comprado : <span style="color: green;"> ${JSON.stringify(
        userCart
      )} </span></h3>`,
    };
    const info = await transporter.sendMail(mailOptCartPurchased);

    console.log(info);
  } catch (err) {
    throw new Error(err);
  }
}

export const mailService = {
  sendMailRegister,
  sendMailCartPurchased,
};
