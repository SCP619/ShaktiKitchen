const router = require('express').Router()

const User = require('../model/user')

router.get('/registration', (req, res) => {
  if (req.session.username) return res.redirect('/')

  res.render('registration', { username: req.session.username })
})
router.post('/registration', async (req, res) => {
  if (req.session.username) return res.redirect('/')

  const { name, username, email, password, phone } = req.body

  const user = await User.findOne({ username })

  if (user) {
    res.render('registration', {
      message : 'User with that email already exists',
      type    : 'danger',
    })
    res.redirect('/registration')
  } else {
    try {
      await new user({
        username,
        name,
        email,
        password,
        phone,
      }).save()

      return res.redirect('/signin')
    } catch (err) {
      res.render('registration', {
        message : 'Fill all fields',
        type    : 'danger',
      })

      return res.redirect('/registration')
    }
  }
})

module.exports = router
