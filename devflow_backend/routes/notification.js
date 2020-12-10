const express = require("express");
const router = express.Router();
const { Notification } = require("../models/Notification.js");
const { Member } = require("../models/Member.js");
const { Team } = require("../models/Team.js");
const { Company } = require("../models/Company.js");
const { nanoid } = require("nanoid");

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

router.get("/company/:id", async (req, res) => {
  console.log("---GetCompanyNotificationByToId---");
  const memberId = req.params.id;
  Notification.find({ level: "2", to: memberId })
    .then((notifications) => {
      if (!notifications) {
        return res.status(404).send("No such notifications");
      }
      res.send(notifications);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/team/:id", async (req, res) => {
  console.log("---GetTeamNotificationByToId---");
  const memberId = req.params.id;
  Notification.find({ level: "3", to: memberId })
    .then((notifications) => {
      if (!notifications) {
        return res.status(404).send("No such notifications");
      }
      res.send(notifications);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/system/:id", async (req, res) => {
  console.log("---GetSystemNotificationByToId---");
  const memberId = req.params.id;
  Notification.find({ level: "1", to: memberId })
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
  console.log("---Add personal message---");
  console.log(req.body);

  // get data for this notification
  const { fromId, toId, message } = req.body;
  const id = nanoid();
  const level = 5;
  const time = new Date().toString();
  console.log(time);

  let notification;
  try {
    // check the from and to member exists
    let fromMember = await Member.findById(fromId);
    if (!fromMember) return res.status(404).send("no such from member");
    let toMember = await Member.findById(fromId);
    if (!toMember) return res.status(404).send("no such to member");

    if (fromMember.companyId !== toMember.companyId)
      return res
        .status(400)
        .send("From and to member must be in the same company");

    notification = await new Notification({
      _id: id,
      from: fromId,
      to: toId,
      level: level,
      message: message,
      time: time,
    }).save();
    console.log(notification);
    console.log("Send personal notification success");
    return;
  } catch (err) {
    console.log(err);
    console.log("Send personal notification failed!");
    res.status(400).send();
    return;
  }
});

router.put("/team", async (req, res) => {
  console.log("---Add team message---");

  // get data for this notification
  const { teamId, message } = req.body;
  const level = 2;
  const time = new Date().toString();

  let notifications = [];
  try {
    // check the from and to member exists
    let toTeam = await Team.findById(teamId);
    if (!toTeam) return res.status(404).send("no such to member");

    // get members in the team
    let teamMembers = await Member.find({ teamId: teamId });
    console.log(teamMembers)
    let teamMemberIds = [];
    let member;
    for (member of teamMembers) {
      teamMemberIds.push(member._id)
    }
    console.log("---teamMemberIds---")
    console.log(teamMemberIds)

    let memberId;
    for (memberId of teamMemberIds) {
      let id = nanoid();
      notifications.push(new Notification({
        _id: id,
        from: "",
        to: memberId,
        level: level,
        message: message,
        time: time,
      }));
    }

    let n;
    for (n of notifications) {
      await n.save()
    }


    // notification = await new Notification({
    //   _id: id,
    //   from: "",
    //   to: /* TODO */,
    //   level: level,
    //   message: message,
    //   time: time,
    // }).save();
    console.log("Send team notification success");
    return;
  } catch (err) {
    console.log(err);
    console.log("Send team notification failed!");
    res.status(400).send();
    return;
  }
});

router.put("/company", async (req, res) => {
  console.log("---Add company message---");

  // get data for this notification
  const { companyId, message } = req.body;
  const level = 3;
  const time = new Date().toString();

  let notifications = [];
  try {
    // check the from and to member exists
    let toCompany = await Company.findById(companyId);
    if (!toCompany) return res.status(404).send("no such to member");

    // get members in the company
    let companyMembers = await Member.find({ companyId: companyId });
    // console.log(companyMembers)
    let companyMemberIds = [];
    let member;
    for (member of companyMembers) {
      companyMemberIds.push(member._id)
    }
    console.log("---companyMemberIds---")
    console.log(companyMemberIds)

    let memberId;
    for (memberId of companyMemberIds) {
      let id = nanoid();
      notifications.push(new Notification({
        _id: id,
        from: "",
        to: memberId,
        level: level,
        message: message,
        time: time,
      }));
    }

    let n;
    for (n of notifications) {
      await n.save()
    }


    // notification = await new Notification({
    //   _id: id,
    //   from: "",
    //   to: /* TODO */,
    //   level: level,
    //   message: message,
    //   time: time,
    // }).save();
    console.log("Send company notification success");
    return;
  } catch (err) {
    console.log(err);
    console.log("Send company notification failed!");
    res.status(400).send();
    return;
  }
});

router.post("/readAll", async (req, res) => {
  console.log("---read all---");
  console.log(req.body);
  const { memberId } = req.body;

  if (!memberId) {
    console.log(memberId);
    res.status(400).send("Missing login fields");
    return;
  }
  let member = await Member.findById(memberId);
  if (!member) {
    console.log("no such user");
    res.status(400).send("Invalid login fields");
    return;
  }
  const results = await Notification.update(
    { to: memberId },
    { $set: { isUnread: false } },
    { multi: true }
  );
  console.log(results);

  res.status(200).send(results);
});

router.post("/ceo-send-notification", async (req, res) => {
  console.log("----- ceo send -----")
  from = req.body.from
  results = req.body.toMembers.map(p => {
    id = nanoid()

    return {
      _id: id,
      from: from,
      level: 2,
      to: p._id,
      message: req.body.message,
      isUnread: true,
      time: new Date()
    }

  })
  Notification.insertMany(results, function (err) {
    console.log(err)
  })
  res.send('success')
})

module.exports = router;
