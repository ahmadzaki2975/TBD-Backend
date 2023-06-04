const router = require('express').Router();
const { getBooks } = require('../controllers/book');

router.get('/', getBooks);

module.exports = router;
