const express = require('express')
const { messagesController } = require('../controllers')

const router = express.Router()

router.get('/', messagesController.getMessages)
router.post('/', messagesController.createMessages)

module.exports = router
