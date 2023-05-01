const socketIO = require('socket.io')

function connectSocketIO(server) {
  const io = new socketIO.Server(server)

  io.on('connection', (socket) => {
    // 1. 通知 client 有新使用者加入、退出
    const numberOfClients = io.engine.clientsCount
    socket.broadcast.emit(
      'userConnectNotify',
      `有鄉民跳進來啦！現在線上有 ${numberOfClients} 人`
    )

    socket.on('disconnect', (reason) => {
      const numberOfClients = io.engine.clientsCount
      io.emit(
        'userConnectNotify',
        `使用者的靈壓...消失惹。現在線上有 ${numberOfClients} 人`
      )
    })
  })
}

module.exports = connectSocketIO
