const express = require('express');
const router = express.Router();
const fs = require("fs");
const {check,validationResult}=require('express-validator');
const auth = require('../middleware/auth.middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('../middleware/upload');


router.get('/userProducts', auth, async (req, res) => {
  try {
    const products = await Product.find({owner: req.user.userId});
    res.send(products)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
});

router.get('/', async (req, res) => {
  const query = {};
  const limit = 5;
  let skipValue;
  let sort;

  if (req.query.category && req.query.category !== 'all' ) {
    query.category = req.query.category
  }
  if (req.query.startPrice) {
    query.price = {
      $gte: req.query.startPrice
    }
  }
  if (req.query.endPrice) {
    if (!query.price) {
      query.price = {}
    }
    query.price['$lte'] = req.query.endPrice
  }
  if (req.query.page && req.query.page > 1) {
    skipValue = limit * (req.query.page - 1)
  }

  if (req.query.sort === 'cheap') {
    sort = { price: 1 };
  } else if (req.query.sort === 'expensive') {
    sort = { price: -1 };
  }
  else  {
    sort = { _id: -1 };
  }
  try {
    const countAll = await Product.count(query);
    const products = await Product.find(query)
       .sort(sort)
        .skip(skipValue)
        .limit(limit);

    res.send({products, countAll});
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const user = await User.findOne({_id: product.owner});
    await Product.updateOne({ _id: req.params.id }, {views: product.views + 1});
    res.send({
      product,
      user: {
        name: user.name,
        phone: user.phone,
        imageSrc: user.imageSrc,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
});

router.post(
    '/', auth,
    upload.single('image'),
    [
      check('name','Введите название.Максимальная длина 25 символов').exists()
          .isLength({max: 25}),
      check('price','Введите цену').exists().isInt(),
      check('category','Вибирете правильную категорию')
          .isIn(['Техника и электроника', 'Одежда и обувь', 'Дом и сад']),
      check('description','Введите описание').exists(),
     ],
    async (req, res) => {

      const errors =validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({
          message: errors.array()[0].msg
        })
      }
      if (!req.file) {
        return res.status(400).json({
          message: 'Не выбран файл из изображением'
        })
      }

      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        imageSrc: req.file.path,
        category: req.body.category,
        description: req.body.description,
        owner: req.user.userId
      });
      try {
        const newProduct = await product.save();
        res.status(201).json(newProduct)
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message ? error.message : error
        })
      }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedProduct = await Product.findOne({owner: req.user.userId, _id: req.params.id});
    fs.unlinkSync(deletedProduct.imageSrc);
    await deletedProduct.remove();
    res.status(200).json({
      message: "Товар успешно удален"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
});


module.exports = router;
