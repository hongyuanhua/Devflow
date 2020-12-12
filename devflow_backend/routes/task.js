const express = require("express");
const router = express.Router();
const { Task } = require("../models/Task.js");
const { Company } = require("../models/Company.js");
const { Team } = require("../models/Team.js");
const { Member } = require("../models/Member.js");
const { nanoid } = require("nanoid");

// get all tasks of a team
router.get("/team/:teamId/:memberId", async (req, res) => {
  console.log("--In get task by team--");
  const teamId = req.params.teamId;
  const memberId = req.params.memberId;

  // check if memeber is from the same company as the team
  let team = await Team.findById(teamId);
  if (!team) {
    return res.status(400).send("No team with such id");
  }
  let member = await Member.findById(memberId);
  if (!member) {
    return res.status(400).send("No member with such id");
  }
  if (member.companyId != team.companyId) {
    return res.status(400).send("Member and team are from different company.");
  }

  // they are from same company and able to see the tasks fo the group
  Task.find({ teamId: teamId })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/all", async (req, res) => {
  Task.find()
    .then((tasks) => {
      if (!tasks) {
        console.log("No such tasks");
        return res.status(404).send("No such tasks");
      }
      console.log("Success in geting all tasks");
      res.send(tasks);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((tasks) => {
      if (!tasks) {
        console.log("No such tasks");
        return res.status(404).send("No such tasks");
      }
      console.log("Success in geting all tasks");
      res.send(tasks);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/company/:id", async (req, res) => {
  const id = req.params.id;
  Task.find({ companyId: id })
    .then((tasks) => {
      if (!tasks) {
        console.log("No such tasks");
        return res.status(404).send("No such tasks");
      }
      console.log("Success in geting all tasks");
      res.send(tasks);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/toMember/:memberId", async (req, res) => {
  console.log("--In get task by member id--");
  const memberId = req.params.memberId;

  // check if memeber is from the same company as the team
  let member = await Member.findById(memberId);
  if (!member) {
    return res.status(400).send("No member with such id");
  }

  // they are from same company and able to see the tasks fo the group
  Task.find({ assignedToId: memberId })
    .then((tasks) => {
      console.log(tasks);
      res.status(200).send(tasks);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.post("/finish", async (req, res) => {
  console.log("---join task---");
  console.log(req.body);
  const { taskId } = req.body;

  if (!taskId) {
    console.log(taskId);
    res.status(400).send("Missing task fields");
    return;
  }
  let task = await Task.findById(taskId);
  if (!task) {
    console.log("no such task");
    res.status(400).send("Invalid task fields");
    return;
  }
  const results = await Task.update(
    { _id: taskId },
    { $set: { isFinish: "true" } },
    { multi: true }
  );
  console.log(results);

  res.status(200).send(results);
});
router.post("/join", async (req, res) => {
  console.log("---join task---");
  console.log(req.body);
  const { taskId, memberId } = req.body;

  if (!memberId) {
    console.log(memberId);
    res.status(400).send("Missing login fields");
    return;
  }
  if (!taskId) {
    console.log(taskId);
    res.status(400).send("Missing task fields");
    return;
  }
  let member = await Member.findById(memberId);
  if (!member) {
    console.log("no such user");
    res.status(400).send("Invalid login fields");
    return;
  }
  let task = await Task.findById(taskId);
  if (!task) {
    console.log("no such task");
    res.status(400).send("Invalid task fields");
    return;
  }
  const results = await Task.update(
    { _id: taskId },
    { $set: { assignedToId: memberId } },
    { multi: true }
  );
  console.log(results);

  res.status(200).send(results);
});
// router.put("/", async (req, res) => {
//     const teamId = req.body.teamId;
//     const
// })
router.put("/add", async (req, res) => {
  console.log("---Add task---");
  const id = nanoid();
  // get data for this notification
  const {
    teamId,
    companyId,
    name,
    estimatedTime,
    usedTime,
    assignedToId,
    assignedById,
    taskDetail,
    isFinish,
  } = req.body;
  console.log(req.body);
  let task;
  try {
    let team = await Team.findById(teamId);
    if (!team) return res.status(404).send("no such team");
    console.log(1);
    let company = await Company.findById(companyId);
    if (!company) return res.status(404).send("no such to company");
    console.log(1);
    let assByMember = await Member.findById(assignedById);
    if (!assByMember) return res.status(404).send("assign by no such member");

    console.log(1);
    task = await new Task({
      _id: id,
      teamId: teamId,
      companyId: companyId,
      name: name,
      estimatedTime: estimatedTime,
      usedTime: usedTime,
      assignedToId: assignedToId,
      assignedById: assignedById,
      taskDetail: taskDetail,
      isFinish: isFinish,
    }).save();
    console.log(task);
    console.log("add task success");

    return;
  } catch (err) {
    console.log(err);
    console.log("add task failed!");
    res.status(400).send();
    return;
  }
});

router.post("/update", async (req, res) => {
  console.log("---update task---");
  console.log(req.body);
  const {
    id,
    teamId,
    companyId,
    name,
    estimatedTime,
    usedTime,
    assignedToId,
    assignedById,
    taskDetail,
  } = req.body;
  console.log(req.body);
  console.log(req.body);
  if (!teamId) {
    console.log(teamId);
    res.status(400).send("Missing team fields");
    return;
  }
  if (!id) {
    console.log(id);
    res.status(400).send("Missing id fields");
    return;
  }

  const results = await Task.update(
    { _id: id },
    {
      $set: {
        teamId: teamId,
        companyId: companyId,
        name: name,
        estimatedTime: estimatedTime,
        usedTime: usedTime,
        assignedToId: assignedToId,
        assignedById: assignedById,
        taskDetail: taskDetail,
      },
    }
  );
  console.log(results);

  res.status(200).send(results);
});

module.exports = router;
