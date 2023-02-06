const { Router } = require("express");
const { getAllDogs, getDogById } = require("../controllers/Dog.js");

const router = Router();

router.get("/", getAllDogs);
router.get("/:id", getDogById);

module.exports = router;