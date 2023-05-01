const { createServer } = require('http')
const dotenv = require('dotenv')

const app = require('./app.js')

dotenv.config({ path: './.env' })

const server = createServer(app)
const PORT = process.env.PORT || 3005

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
