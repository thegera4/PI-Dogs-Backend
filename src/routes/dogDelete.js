const { Router } = require("express");
const { deleteDog } = require("../controllers/Dog");

const router = Router();

router.delete("/:id", deleteDog);

module.exports = router;