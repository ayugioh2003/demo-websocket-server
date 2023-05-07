const socketIO = require('socket.io')
const dayjs = require('dayjs')

const Message = require('../models/message')

function connectSocketIO(server) {
  const io = new socketIO.Server(server)

  io.on('connection', (socket) => {
    // 1. 通知 client 有新使用者加入、退出
    const numberOfClients = io.engine.clientsCount
    socket.broadcast.emit(
      'userConnectNotify',
      `有鄉民跳進來啦！現在線上有 ${numberOfClients} 人`
    )

    socket.on('disconnect', () => {
      const numberOfClients = io.engine.clientsCount
      io.emit(
        'userConnectNotify',
        `使用者的靈壓...消失惹。現在線上有 ${numberOfClients} 人`
      )
    })

    // 2. 發送聊天訊息給其他人
    socket.on('chatMessage', async (messagePayload) => {
      const { user, content } = messagePayload
      console.log('messagePayload', messagePayload)
      // 3. 儲存訊息
      try {
        const message = await Message.create({
          user,
          content,
        })
        console.log('message', message)
        io.emit('chatMessage', {
          ...messagePayload,
          // createAt: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
        })
      } catch (error) {
        console.error(error)
      }
    })

    // 4. 開房間
    socket.on('joinRoom', function (chatroom) {
      socket.join(chatroom)
    })

    socket.on('roomMessage', async (messagePayload) => {
      const { user, content, chatroom } = messagePayload
      console.log('messagePayload', messagePayload)
      try {
        const message = await Message.create({
          user,
          content,
          chatroom,
        })
        console.log('message', message)
        io.to(chatroom).emit('roomMessage', {
          ...messagePayload,
        })
      } catch (error) {
        console.error(error)
      }
    })

    socket.on('leaveRoom', function (chatroom) {
      socket.leave(chatroom)
    })
  })
}

module.exports = connectSocketIO
