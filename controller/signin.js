const User = require('../model/user')
const router = require('express')()

router.get('/signin', (req, res) => {
  if (req.session.username) return res.redirect('/')

  return res.render('signin', { name: req.session.name })
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body

  if (!password || !username) {
    res.sendStatus(400)
    return res.render('signin', { name: req.session.name })
  }

  const user = await User.findOne({ username, password })

  if (!user)
    return res.render('signin', {
      message : 'Username/Password do not match',
      type    : 'danger',
      name    : '',
    })

  //initiating session
  req.session.name = user.name
  req.session.username = user.username
  req.session.is_admin = user.is_admin

  return res.redirect('/home')
})

module.exports = router
