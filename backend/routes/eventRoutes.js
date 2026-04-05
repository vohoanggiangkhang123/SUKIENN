const router = require("express").Router();
const eventController = require("../controllers/eventController");

router.get("/stats/overview", eventController.getStatsOverview);
router.get("/activities/recent", eventController.getRecentActivities);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
