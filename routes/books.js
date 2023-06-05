const router = require('express').Router();
const { getBooks, getBookById, updateBookById, deleteBookById, addNewBook } = require('../controllers/book');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/update/:id', updateBookById);
router.delete('/delete/:id', deleteBookById);
router.post('/add', addNewBook);

module.exports = router;
