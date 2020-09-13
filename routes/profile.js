const express = require('express');
const router = express.Router();
const fs = require("fs");
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload');

router.get('/',auth, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.userId});
    res.status(200).json(user)
  }catch (error) {
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error
  })
}
});

router.patch('/', auth, upload.single('image'), async (req, res) => {
  const updated = {};
  if (req.file) {
    updated.imageSrc = req.file.path
  }
  try {
    const oldUser = await User.findOne({_id: req.user.userId});
    if (oldUser.imageSrc !== 'uploads\\no-avatar.png') {
      fs.unlinkSync(oldUser.imageSrc);
    }
    const user = await User.findOneAndUpdate(
        {_id: req.user.userId},
        {$set: updated},
        {new: true}
    );

    res.status(200).json(user)
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error
    })
  }
});


module.exports = router;
