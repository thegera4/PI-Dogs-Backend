const {Router} = require("express");
const { getTemperaments } = require("../controllers/Temperament.js");

const router = Router();

router.get("/", getTemperaments);

module.exports = router;