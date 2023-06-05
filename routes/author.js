const router = require('express').Router();
const { getAuthors, getAuthorById } = require('../controllers/author');

router.get('/', getAuthors);
router.get('/:id', getAuthorById);

module.exports = router;