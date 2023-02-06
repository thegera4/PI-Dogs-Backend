const { Router } = require("express");
const { updateDog } = require("../controllers/Dog");

const router = Router();

router.patch("/:id", updateDog);

module.exports = router;