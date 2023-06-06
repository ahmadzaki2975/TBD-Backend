const router = require('express').Router();
const { getAuthors, getAuthorById, getWrittenBooks, postNewAuthor, deleteAuthorById } = require('../controllers/author');

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.get('/books/:id', getWrittenBooks);
router.post('/add', postNewAuthor);
router.delete('/delete/:id', deleteAuthorById);


module.exports = router;