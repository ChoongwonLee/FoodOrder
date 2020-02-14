const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const Menu = require('../models/Menus');

// set food image storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // to accept file
  if (file.mimetype === 'image/jpeg' || filem.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only jpeg & png format!'), false);
  }
};

// define how to store image
const upload = multer({
  // dest: './uploads'
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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
    check('foodImage', 'Please add food image')
      .not()
      .isEmpty(),
    check('price', 'Please add price')
      .not()
      .isEmpty(),
    upload.single('foodImage')
  ],
  async (req, res) => {
    console.log(req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, ingredients, description, price } = req.body;
    console.log(req.file);
    try {
      const newMenu = new Menu({
        admin: req.admin.id,
        title,
        ingredients,
        description,
        foodImage: req.file.path,
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
    const menus = await Menu.find().sort({ date: -1 });
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     PUT api/menus
// @desc      Update menu
// @access    Private
router.put('/:id', [auth, upload.single('foodImage')], async (req, res) => {
  console.log(req.file);
  const { title, ingredients, description, price } = req.body;

  const menuFields = {};
  if (title) menuFields.title = title;
  if (ingredients) menuFields.ingredients = ingredients;
  if (description) menuFields.description = description;
  if (price) menuFields.price = price;
  if (req.file.path) menuFields.foodImage = req.file.path;

  try {
    let menu = await Menu.findById(req.params.id);

    if (!menu) return res.stats(404).json({ msg: 'Menu not found' });

    // Make sure admin owns menu
    if (menu.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    menu = await Menu.findOneAndUpdate(
      req.params.id,
      { $set: menuFields },
      { new: true }
    );

    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     DELETE api/menus
// @desc      Delte menu
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let menu = await Menu.findById(req.params.id);

    if (!menu) return res.stats(404).json({ msg: 'Menu not found' });

    // Make sure admin owns menu
    if (menu.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Menu.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Menu removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
