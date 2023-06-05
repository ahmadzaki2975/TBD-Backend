const router = require('express').Router();
const { getPublishers } = require('../controllers/publisher');

router.get('/', getPublishers);

module.exports = router;