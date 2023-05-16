import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  username: { type: Schema.Types.String, require: true, max: 20 },
  msgtype: { type: Schema.Types.String, require: true, max: 10 },
  message: { type: Schema.Types.String, require: true, max: 500 },
  timestamp: { type: Schema.Types.String, require: true, max: 30 },
});

const ChatSchema = new Schema({
  username: { type: Schema.Types.String, require: true, max: 20 },
  messages: [MessageSchema],
});

export const chats = model("chats", ChatSchema);
