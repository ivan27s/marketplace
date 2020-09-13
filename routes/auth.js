const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const {check,validationResult}=require('express-validator');
const User = require('../models/User');
const keys = require('../config/keys');

router.post(
    '/login',
    [
      check('email','Введите корректный email').isEmail(),
      check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {

      const errors =validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({
          message: errors.array()[0].msg
        })
      }

      const candidate = await User.findOne({email: req.body.email});

      if (candidate) {
        const passwordResult =bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
          const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
          }, keys.jwt, {expiresIn: '24h'});

          res.status(200).json({
            token: `Bearer ${token}`
          })
        }else {
          res.status(401).json({
            message: 'Неверный пароль'
          })
        }
      } else {
        res.status(404).json({
          message: 'Пользователь с таким email не найден'
        })
      }
});

router.post(
    '/register',
    [
      check('email','Некорректный email').isEmail(),
      check('name','Минимальная длина имени 3 символа').isLength({min:3}),
      check('phone','Длина телефона должна быть 10 символов').isLength({min: 10, max: 10}),
      check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req, res) => {
      const errors =validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({
          message: errors.array()[0].msg
        })
      }
      const candidate = await User.findOne({email: req.body.email});

      if (candidate) {
        res.status(409).json({
          message: 'Такой email уже занят'
        })
      } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
          email: req.body.email,
          name: req.body.name,
          phone: req.body.phone,
          password: bcrypt.hashSync(password, salt),
          imageSrc: 'uploads\\no-avatar.png'
        });
        try {
          await user.save();
          res.status(201).json(user)
        } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
        }
      }
    });


module.exports = router;
