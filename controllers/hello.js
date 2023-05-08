const helloService = require('../services/hello')

const sayHello = async (req, res) => {
  const helloMessage = await helloService.getHelloMessage()
  return res.json(helloMessage)
}

module.exports = {
  sayHello,
}
