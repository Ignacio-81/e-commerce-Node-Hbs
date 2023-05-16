import ChatsDaoFactory from "../daos/chatsDaoFactory.js";
import config from "../config/config.js";

//let chats = new ChatDao("chats");
const chatsApi = ChatsDaoFactory.getDao(config.tipo_persistencia);

async function findAllChats() {
  try {
    const allChats = await chatsApi.findAll();
    return allChats;
  } catch (err) {
    throw new Error(err);
  }
}

async function findAllChatsByUser(user) {
  try {
    const result = await chatsApi.findByParam("username", user.toLowerCase());
    if (result) {
      return result;
    } else {
      console.log("No chat data found");
      throw new Error(`No data found`);
    }
  } catch (err) {
    throw new Error("Error find chat by user in DB " + err);
  }
}

async function saveMsg(user, msgRequest) {
  try {
    let chatFromUser = await findAllChatsByUser(user);
    if (Object.keys(chatFromUser).length === 0) {
      const idNuevoChat = await createChat(user);
      chatFromUser.push(await chatsApi.findById(idNuevoChat));
    }
    let username = user.toLocaleString();
    let today = new Date();
    let date = today.toLocaleString();
    const newM = { username, ...msgRequest, timestamp: date };
    chatFromUser[0].messages.push(newM);
    const savechats = await chatsApi.modif(
      chatFromUser[0]._id,
      chatFromUser[0]
    );
    return savechats;
  } catch (err) {
    throw new Error(err);
  }
}
async function createChat(user) {
  try {
    let chat = {
      username: user.toLocaleString(),
      messages: [{}],
    };
    const response = await chatsApi.create(chat);
    console.log(response);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
export const chatService = {
  findAllChats,
  findAllChatsByUser,
  saveMsg,
  createChat,
};
