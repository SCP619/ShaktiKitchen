const express = require('express')
const Cart = require('../model/cart')
const Product = require('../model/product')

let router = express.Router()

router.get('/cart', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')

  const cart = await Cart.find({ is_checked: false })

  res.render('cart', {
    username : req.session.username,
    cart,
  })
})

router.post('/cart', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')
  const { id, name, quantity, price } = req.body

  const doesExist = await Cart.exists({ product_id: id, is_checked: false })

  if (doesExist) {
    for (let i = 0; i < quantity; i++)
      await Cart.findOneAndUpdate({ product_id: id, is_checked: false }, { $inc: { quantity: 1 } })

    } else {
    const cart = new Cart({ product_id: id, quantity, name, price })

    await cart.save()
  }

  return true
})

router.post('/cartClear', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')
  const cart = await Cart.find({ is_checked: false })

  cart.map(async ({ id }) => {
    await Cart.findByIdAndRemove(id)
  })

  return res.render('cart', {
    username : req.session.username,
    cart     : await Cart.find({ is_checked: false }),
  })
})

router.post('/cartConfirm', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')
  const cart = await Cart.find({ is_checked: false })

  cart.map(async ({ id }) => {
    await Cart.findByIdAndUpdate(id, { $set: { is_checked: true } })
  })

  return res.render('cart', {
    username : req.session.username,
    cart     : await Cart.find({ is_checked: false }),
  })
})
module.exports = router
