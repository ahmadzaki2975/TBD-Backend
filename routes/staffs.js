const router = require("express").Router();

const { getStaffs } = require("../controllers/staffs");

router.get("/", getStaffs);

module.exports = router;
