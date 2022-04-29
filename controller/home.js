const router = require('express')()
const Product = require('../model/product')

router.get('/', (req, res) => res.redirect('/home'))

router.get('/home', async(req, res) => {
    if (req.session.is_admin) return res.redirect('/order')
    if (!req.session.username) return res.redirect('/signin')

    const product = await Product.find()

    res.render('home', {
        name: req.session.name,
        is_admin: req.session.is_admin,
        store: product,
    })
})

// const prod = new Product({
//   catagory : 'Burger',
//   items    : [
//     {
//       image       :
//         'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6616349.jpg&w=958&h=641&c=sc&poi=face&q=60',
//       name        : 'ASIAN STYLE',
//       price       : '190',
//       description : 'Potato and peanut Burger, vegan mayo, asian slaw',
//     },
//     {
//       image       :
//         'https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Tofu-Burgers-1-2.jpg',
//       name        : 'TOFU BURGER',
//       price       : '180',
//       description : 'Herbed tofu and mushrooms patty, caramelized onion, relish',
//     },
//     {
//       image       : 'http://www.howsweeteats.com/wp-content/uploads/2011/04/bbqburgers-6.jpg',
//       name        : 'BBQ Chicken Cheese',
//       price       : '160',
//       description : 'Ground chicken breast, whole wheat, bbq sauce, gouda',
//     },
//     {
//       image       :
//         'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//       name        : 'Classic Cheesy Beef',
//       price       : '240',
//       description : 'Ground beef, cheese, worcestershire sauce, garlic',
//     },
//   ],
// })

// await prod.save()

module.exports = router