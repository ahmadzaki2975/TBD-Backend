const router = require('express').Router();
const { getPublishers, getPublisherById, deletePublisherById } = require('../controllers/publisher');

router.get('/', getPublishers);
router.get('/:publishername', getPublisherById);
router.delete('/delete/:publishername', deletePublisherById);

module.exports = router;