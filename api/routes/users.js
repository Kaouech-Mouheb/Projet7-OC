const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

// ROUTES //

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/', auth, userCtrl.getUserAccount);
router.get('/users', auth, userCtrl.getAllUsers);

router.put('/update', auth, multer, userCtrl.updateProfil);

/* EXPORT */
module.exports = router;
