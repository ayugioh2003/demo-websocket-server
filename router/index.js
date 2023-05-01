const express = require('express')

const helloRouter = require('./hello')
const messagesRouter = require('./messages')

const router = express.Router()

router.use('/api/hello', helloRouter)
router.use('/api/messages', messagesRouter)

module.exports = router
