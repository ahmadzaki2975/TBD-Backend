const router = require('express').Router();

const sqlController = require('../controllers/sql');

router.post('/', sqlController.freeSql);

module.exports = router;
