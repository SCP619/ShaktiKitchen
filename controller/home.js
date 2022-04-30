const router = require('express')()
const Product = require('../model/product')

router.get('/', (req, res) => res.redirect('/home'))

router.get('/home', async (req, res) => {
  if (req.session.is_admin) return res.redirect('/order/admin')
  if (!req.session.username) return res.redirect('/signin')

  const product = await Product.find()

  res.render('home', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
    store    : product,
  })
})

module.exports = router
