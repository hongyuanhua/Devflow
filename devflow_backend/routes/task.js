const express = require("express");
const router = express.Router();
const { Task } = require("../models/Task.js");
const { Company } = require("../models/Company.js");
const { Team } = require("../models/Team.js");
const { Member } = require("../models/Member.js");


// get all tasks of a team
router.get("/team/:teamId/:memberId", async (req, res) => {
    console.log("--In get task by team--")
    const teamId = req.params.teamId;
    const memberId = req.params.memberId;

    // check if memeber is from the same company as the team
    let team = await Team.findById(teamId);
    if (!team) { return res.status(400).send("No team with such id") }
    let member = await Member.findById(memberId);
    if (!member) { return res.status(400).send("No member with such id") }
    if (member.companyId != team.companyId) { return res.status(400).send("Member and team are from different company.") }

    // they are from same company and able to see the tasks fo the group
    Task.find({ teamId: teamId })
        .then(tasks => {
            res.status(200).send(tasks);
        })
        .catch(err => res.status(500).send("Server err"))
});

router.get("/member/:memberId", async (req, res) => {
    console.log("--In get task by member id--")
    const memberId = req.params.memberId;

    // check if memeber is from the same company as the team
    let member = await Member.findById(memberId);
    if (!member) { return res.status(400).send("No member with such id") }

    // they are from same company and able to see the tasks fo the group
    Task.find({ assignedToId: memberId })
        .then(tasks => {
            res.status(200).send(tasks);
        })
        .catch(err => res.status(500).send("Server err"))
});

// router.put("/", async (req, res) => {
//     const teamId = req.body.teamId;
//     const
// })
module.exports = router;