const { createServer } = require('http')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

// EXPRESS
const app = require('./application/app.js')
const server = createServer(app)
const PORT = process.env.PORT || 3005

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

// DATABASE

// Socket.io
