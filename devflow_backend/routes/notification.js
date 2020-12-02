const express = require("express");
const router = express.Router();
const { Notification } = require("../models/Notification.js");

router.get("/to/:id", async (req, res) => {
  console.log("---GetNotificationByToId---");
  const memberId = req.params.id;
  Notification.find({ to: memberId })
    .then((notifications) => {
      if (!notifications) {
        return res.status(404).send("No such notifications");
      }
      res.send(notifications);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/from/:id", async (req, res) => {
  console.log("---GetNotificationByFromId---");
  const memberId = req.params.id;
  Notification.find({ from: memberId })
    .then((notifications) => {
      if (!notifications) {
        return res.status(404).send("No such notifications");
      }
      res.send(notifications);
    })
    .catch((err) => res.status(500).send("Server err"));
});
module.exports = router;
