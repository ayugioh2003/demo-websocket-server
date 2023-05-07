const socketIO = require('socket.io')
const dayjs = require('dayjs')

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
    socket.on('chatMessage', (messagePayload) => {
      console.log('messagePayload', messagePayload)
      io.emit('chatMessage', {
        ...messagePayload,
        dateTime: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
      })
    })
  })
}

module.exports = connectSocketIO
