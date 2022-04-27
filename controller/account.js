const router = require('express')()
const User = require('../model/user')

router.get('/account', async (req, res) => {
  if (!req.session.username) return res.redirect('/')

  const user = await User.findOne({ username: req.session.username })

  return res.render('account', {
    name : req.session.name,
    user,
  })
})
router.post('/account', async (req, res) => {
  if (!req.session.username) return res.redirect('/')

  const { name, email, password } = req.body

  const user = await User.find({ username: req.session.username })

  if (password !== '') await User.findOneAndUpdate({ username: req.session.username }, { $set: { password } })

  if (name !== user.name) {
    await User.findOneAndUpdate({ username: req.session.username }, { $set: { name } })
    req.session.name = name
  }

  if (email !== user.email) await User.findOneAndUpdate({ username: req.session.username }, { $set: { email } })

  return res.redirect('/account')
})

module.exports = router
