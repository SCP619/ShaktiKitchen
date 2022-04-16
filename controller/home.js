const express = require('express')
const router = express.Router()
const Product = require('../model/product')

router.get('/', (req, res) => res.redirect('/home'))

router.get('/home', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  const product = await Product.find()

  res.render('home', {
    username : req.session.username,
    is_admin : req.session.is_admin,
    store    : product,
  })
})

module.exports = router
