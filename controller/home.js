const express = require('express')
const Store = require('../model/store')

const router = express.Router()

router.get('/', (req, res) => res.redirect('/home'))

router.get('/home', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')

  // const store = await find()
  const store = await Store.find()
  console.log(store)

  res.render('home', {
    username: req.session.username,
    store,
  })
})

module.exports = router
