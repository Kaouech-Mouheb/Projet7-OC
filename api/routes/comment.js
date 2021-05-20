const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');



// ROUTES //

router.post('/:id', auth, commentCtrl.comment)

router.delete('/:id', auth, commentCtrl.deleteComment);

// EXPORT //

module.exports = router;