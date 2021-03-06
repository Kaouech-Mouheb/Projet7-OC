const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

// ROUTES //

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/admin', auth, userCtrl.addAdmin);

router.get('/', auth, userCtrl.getUserAccount);
router.get('/users', auth, userCtrl.getUsers);
router.get('/:id', auth, userCtrl.getProfil);




router.put('/update-profil', auth, userCtrl.updateProfil);
router.put('/update-image', auth, multer, userCtrl.updateImage);
router.put('/update-password', auth, multer, userCtrl.updatePassword);




router.delete('/users/delete', auth, userCtrl.deleteAccount);
router.delete('/users/delete/:id', auth, userCtrl.deleteAccountByAdmin);


/* EXPORT */
module.exports = router;