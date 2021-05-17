const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


// ROUTES //

// POST //
router.post('/', auth, multer, publicationCtrl.createPublication);
router.post('/text', auth, publicationCtrl.createPublicationText);

router.get('/', auth, publicationCtrl.getPublications);

router.put('/:id', auth, publicationCtrl.updatePublication);

router.delete('/:id', auth, publicationCtrl.deletePublication);

// EXPORT //

module.exports = router;