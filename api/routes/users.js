const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

// ROUTES //

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/', auth, userCtrl.getUserAccount);
router.get('/:id', auth, userCtrl.getProfil);
router.get('/users', auth, userCtrl.getAllUsers);

router.put('/update-profil', auth, userCtrl.updateProfil);
router.put('/update-image', auth, multer, userCtrl.updateImage);
router.put('/update-password', auth, multer, userCtrl.updatePassword);
router.put('/admin', auth, userCtrl.addAdmin);



router.delete('/users/delete', auth, userCtrl.deleteAccount);


/* EXPORT */
module.exports = router;