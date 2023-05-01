const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: [true, '訊息內容需填寫'],
    },
    user: {
      type: String,
    },
    chatroom: {
      type: String,
    },
    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    // 移除 version 欄位
    versionKey: false,
    // 自動添加 createdAt, updatedAt
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
)

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
