const router = require('express').Router();
const { getAuthors, getAuthorById, getWrittenBooks, postNewAuthor } = require('../controllers/author');

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.get('/books/:id', getWrittenBooks);
router.post('/add', postNewAuthor);


module.exports = router;