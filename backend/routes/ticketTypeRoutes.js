const router = require("express").Router();
const ticketTypeController = require("../controllers/ticketTypeController");

router.get("/", ticketTypeController.listByEvent);
router.post("/", ticketTypeController.create);
router.put("/:id", ticketTypeController.update);
router.delete("/:id", ticketTypeController.remove);

module.exports = router;
