const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const auth = require('../middleware/auth');
// const Admin = require('../models/Admin');
const User = require('../models/User');
const Menus = require('../models/Menus');

// const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.REGION
// });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.S3_BUCKET_NAME,
  region: process.env.REGION
});

// // Instead of saving diskStorage, save it to AWS S3
// // set food image storage
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });

const fileFilter = (req, file, cb) => {
  // to accept file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpeg' ||
    filem.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, jpeg & png format!'), false);
  }
};

// define how to store image
const upload = multer({
  // dest: './uploads'
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// @route     POST api/menus/upload
// @desc      Upload menu image
// @access    Private
router.post(
  '/upload',
  upload.single('foodImage'),
  (req, res) => {
    return res.json({
      success: true,
      key: res.req.file.key
      // path: res.req.file.path,
      // fileName: res.req.file.filename
    });
  },
  (error, req, res, next) => {
    return res.json({ suceess: false, error });
  }
);

// @route     POST api/menus
// @desc      Add new menu
// @access    Private
router.post(
  '/',
  [
    auth,
    check('title', 'Please add menu title')
      .not()
      .isEmpty(),
    check('ingredients', 'Please add ingredients')
      .not()
      .isEmpty(),
    check('description', 'Please add description')
      .not()
      .isEmpty(),
    check('price', 'Please add price')
      .not()
      .isEmpty()
    // upload.single('foodImage')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, ingredients, description, foodImage, price } = req.body;
    // console.log(req.file);
    try {
      const newMenu = new Menus({
        user: req.user.id,
        title,
        ingredients,
        description,
        foodImage,
        price
      });

      const menu = await newMenu.save();

      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err });
    }
  }
);

// @route     GET api/menus
// @desc      Get all menus
// @access    Public
router.get('/', async (req, res) => {
  try {
    const menus = await Menus.find().sort({ date: -1 });
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     PUT api/menus/:id
// @desc      Update menu
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { title, ingredients, description, price, foodImage } = req.body;

  const menuFields = {};
  if (title) menuFields.title = title;
  if (ingredients) menuFields.ingredients = ingredients;
  if (description) menuFields.description = description;
  if (price) menuFields.price = price;
  if (foodImage) menuFields.foodImage = foodImage;

  try {
    let menu = await Menus.findById(req.params.id);

    if (!menu) return res.status(404).json({ msg: 'Menu not found' });

    // Make sure user owns menu
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // THIS CODE CAUSES UPDATE PROBLEM!!!
    // menu = await Menus.findOneAndUpdate(
    //   req.params.id,
    //   { $set: menuFields },
    //   { new: true }
    // );
    menu = await Menus.findByIdAndUpdate(
      req.params.id,
      { $set: menuFields },
      {
        new: true,
        runValidators: true
      }
    );

    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// @route     DELETE api/menus:id
// @desc      Delte menu
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let menu = await Menus.findById(req.params.id);

    if (!menu) return res.stats(404).json({ msg: 'Menu not found' });

    // Make sure user owns menu
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Menus.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Menu removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// @route     GET api/menus/:id
// @desc      Get menu by ID
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let menu = await Menus.findById(req.params.id);
    if (!menu) return res.status(404).json({ msg: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
