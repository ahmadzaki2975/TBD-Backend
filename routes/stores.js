const router = require("express").Router();
const { getStores } = require("../controllers/stores");

router.get("/", getStores);

module.exports = router;
