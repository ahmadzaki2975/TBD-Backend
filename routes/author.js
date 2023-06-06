const router = require('express').Router();
const { getAuthors, getAuthorById, getWrittenBooks } = require('../controllers/author');

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.get('/books/:id', getWrittenBooks);


module.exports = router;