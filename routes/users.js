var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');
var multer = require('multer');
var path = require('path')

const fs = require('fs-extra');
const dirPath = path.join('public/uploads',);

var storage = multer.diskStorage({
  destination: (req, res, cb) => {
    fs.mkdirp(dirPath);
    cb(null, dirPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage })

/* GET users listing. */
// router.get('/', (req, res) => res.send('Welcome to create user GET'));

router.post('/', upload.single('profile'), userCtrl.create)
  .get('/', userCtrl.getUsers)
  .get('/get-user-by-id/:id', userCtrl.getUserById)
  // .get('/search', userCtrl.searchUser)
  .delete('/:id', userCtrl.deleteUser)
  .put('/:id', upload.single('profile'), userCtrl.updateUser)


module.exports = router;
