const router = require('express').Router();
const { getBooks, getBookById, updateBookById } = require('../controllers/book');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/update/:id', updateBookById);

module.exports = router;
