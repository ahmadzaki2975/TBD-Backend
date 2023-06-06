const router = require("express").Router();

const { getCustomers } = require("../controllers/customer");

router.get("/", getCustomers);

module.exports = router;