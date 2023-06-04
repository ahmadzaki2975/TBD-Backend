const router = require('express').Router();
const { getBooks } = require('../controllers/sql');

router.get('/', getBooks);

module.exports = router;
