const router = require('express').Router();
const { getBooks, getBookById } = require('../controllers/book');

router.get('/', getBooks);
router.get('/:id', getBookById);

module.exports = router;
