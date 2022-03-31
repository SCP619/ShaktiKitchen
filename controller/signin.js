const { clearCache } = require('ejs')
const express = require('express')
const User = require('../model/user')

const router = express.Router()

router.get('/signin', (req, res) => {
  if (req.session.username) return res.redirect('/')
  res.render('signin', { username: req.session.username })
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username, password })

  if (!user) {
    return res.render('signin', {
      message : 'Username/Password do not match',
      type    : 'danger',
    })
  }

    //initiating session
    req.session.username = user.username
    return res.redirect('/')
})

module.exports = router
