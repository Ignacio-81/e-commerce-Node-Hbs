import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendMailCartPurchased(userName, newOrder) {
  const mailBody = `
    <h2>Order Details</h2>
    <table>
      <tr>
        <th>Product Name</th>
        <th>Description</th>
        <th>Quantity</th>
      </tr>
      ${newOrder.products
        .map(
          (product) => `
        <tr>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.qty}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  
    <h2>Order Information</h2>
    <ul>
      <li><strong>Order Number:</strong> ${newOrder.orderNumber}</li>
      <li><strong>Order Timestamp:</strong> ${newOrder.timestamp}</li>
      <li><strong>Order Status:</strong> ${newOrder.status}</li>
      <li><strong>Username:</strong> ${newOrder.username}</li>
      <li><strong>Delivery Address:</strong> ${newOrder.deliverAdd}</li>
    </ul>
  `;
  try {
    const mailOptCartPurchased = {
      from: "E-Commerce Node CoderHouse",
      to: `${process.env.GMAIL_USER}@gmail.com`,
      subject: `Nuevo pedido de : ${userName} `,
      html: mailBody,
    };
    const info = await transporter.sendMail(mailOptCartPurchased);

    console.log(info);
  } catch (err) {
    throw new Error(err);
  }
}

export const mailService = {
  sendMailCartPurchased,
};
