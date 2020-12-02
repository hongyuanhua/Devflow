const express = require("express");
const router = express.Router();
const { Notification } = require("../models/Notification.js");
const { Member } = require("../models/Member.js");
const { nanoid } = require('nanoid')

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

router.get("/all", async (req, res) => {
  console.log("---GetAllNotification---");
  Notification.find()
    .then((notifications) => {
      if (!notifications) {
        return res.status(404).send("No such notifications");
      }
      res.send(notifications);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.put("/personal", async (req, res) => {
  console.log("---Add personal message---")
  console.log(req.body);

  // get data for this notification
  const { fromId, toId, message } = req.body;
  const id = nanoid()
  const level = 5;
  const time = new Date().toString();
  console.log(time)

  let notification;
  try {
    // check the from and to member exists
    let fromMember = await Member.findById(fromId);
    if (!fromMember) return res.status(404).send("no such from member")
    let toMember = await Member.findById(fromId);
    if (!toMember) return res.status(404).send("no such to member")

    if (fromMember.companyId !== toMember.companyId) return res.status(400).send("From and to member must be in the same company")

    notification = await new Notification({
      _id: id,
      from: fromId,
      to: toId,
      level: level,
      message: message,
      time: time,
    }).save();
    console.log(notification);
    console.log("Send personal notification success")
    return;
  } catch (err) {
    console.log(err);
    console.log("Send personal notification failed!");
    res.status(400).send();
    return;
  }
});

module.exports = router;
