const router = require('express').Router();
const {getGenres} = require('../controllers/genres');

router.get('/', getGenres);

module.exports = router;