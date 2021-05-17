const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');



// ROUTES //

router.post('/:id', auth, likeCtrl.like)
router.get('/:id', auth, likeCtrl.like)

// EXPORT //

module.exports = router;