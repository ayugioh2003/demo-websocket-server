const express = require('express')
const { helloController } = require('../controllers')

const router = express.Router()

router.get('/', helloController.sayHello)

module.exports = router
