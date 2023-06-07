const router = require("express").Router();

const { getPurchases } = require("../controllers/purchases");

router.get("/", getPurchases);

module.exports = router;

