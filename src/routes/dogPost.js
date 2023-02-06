const { Router } = require("express");
const { postDog } = require("../controllers/Dog");

const router = Router();

router.post("/", postDog);

module.exports = router;