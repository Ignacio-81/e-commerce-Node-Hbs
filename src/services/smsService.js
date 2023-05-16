import twilio from "twilio";

const accountSid = "ACac1d5752ed60e22d90044132c3a35d38";
const authToken = "2ba2579bb3b375d2457836bc356a3dfd";
const client = twilio(accountSid, authToken);
const toNumber = +5493515954531;

async function sendWsp(userCartProds) {
  try {
    const optionswsp = {
      body: `Cart purchased : ${JSON.stringify(userCartProds)}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${toNumber}`,
    };
    const message = await client.messages.create(optionswsp);

    console.log("Wsp Enviado " + message);
  } catch (err) {
    throw new Error(err);
  }
}

async function sendSms(numUsuario) {
  try {
    const optionssms = {
      body: "Su pedido se esta procesando...",
      from: "+15076195074",
      to: numUsuario,
    };
    const message = await client.messages.create(optionssms);

    console.log("SMS Enviado " + message);
  } catch (err) {
    throw new Error(err);
  }
}

export const smsService = {
  sendWsp,
  sendSms,
};
