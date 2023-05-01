const Message = require('../models/message')

/**
 * 取得聊天訊息
 * GET /api/messages
 */
const getMessages = async (req, res) => {
  const query = {}
  for (let q in req.query) {
    query[q] = req.query[q]
  }

  try {
    const messages = await Message.find(query).exec()
    return res.json({ data: messages })
  } catch (error) {
    res.status(400)
    return res.json({ message: error })
  }
}

/**
 * 新增聊天訊息
 * POST /api/messages
 */
const createMessages = async (req, res) => {
  console.log('req.body', req.body)
  let { user, content, chatroom } = req.body

  // 必填未填
  content = content?.trim()
  if (!user || !content || !chatroom) {
    res.status(400)
    return res.json({ message: '欄位有誤' })
  }

  try {
    const newMessage = await Message.create({
      user,
      content,
      chatroom,
    })
    return res.json({
      message: '新增成功',
      data: newMessage,
    })
  } catch (error) {
    return res.json({ message: error })
  }
}

module.exports = {
  getMessages,
  createMessages,
}
