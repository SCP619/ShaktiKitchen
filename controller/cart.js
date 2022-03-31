const express = require('express')

let router = express.Router()

router.get('/cart', (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  res.render('cart', { username: req.session.username })
})

module.exports = router
