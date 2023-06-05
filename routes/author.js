const router = require('express').Router();
const { getAuthors } = require('../controllers/author');

router.get('/', getAuthors);

module.exports = router;