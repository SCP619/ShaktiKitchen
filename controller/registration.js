const router = require('express')()
const User = require('../model/user')

router.get('/registration', (req, res) => {
  if (req.session.username) return res.redirect('/')

  return res.render('registration', { name: req.session.name })
})
router.post('/registration', async (req, res) => {
  if (req.session.username) return res.redirect('/')

  const { name, username, email, password, phone } = req.body
  console.log(name, username, email, password, phone)

  const user = await User.findOne({ username })

  if (!user)
    return res.render('registration', {
      message : 'User with that email already exists',
      type    : 'danger',
    })

  try {
    const newUser = await new User({
      username,
      name,
      email,
      password,
      phone,
    }).save()

    return res.redirect('/signin')
  } catch (error) {
    return res.render('registration', {
      message : 'Fill all fields',
      type    : 'danger',
    })
  }
})

module.exports = router
