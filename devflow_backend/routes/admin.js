const express = require("express");
const router = express.Router();
const app = express();

const { Member } = require("../models/Member");
const { Company } = require("../models/Company");
const { Team } = require("../models/Team");
const { Task } = require("../models/Task");

router.get("/getCompany", async (req, res) => {
  console.log("---GetCompany---");
  Company.find({})
    .then((company) => {
      res.send(company);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.delete("/deleteCompany", async (req, res) => {
  console.log("---deleteCompany---");
  //   const { _id } = req.body._id;
  //   console.log(req.body._id);
  Company.findOneAndRemove({ _id: req.body._id }, function (err, company) {
    if (!err && company) {
      console.log(company);
      //   console.log("Company successfully deleted");
      res.status(200).send("Company successfully deleted");
    } else {
      console.log("error");
      res.status(404).send("error");
    }
  });
});

router.get("/getTeam", async (req, res) => {
  console.log("---getTeam---");
  Team.find({})
    .then((team) => {
      res.send(team);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.delete("/deleteTeam", async (req, res) => {
  console.log("---deleteTeam---");
  //   const { _id } = req.body._id;
  //   console.log(req.body._id);
  Team.findOneAndRemove({ _id: req.body._id }, function (err, team) {
    if (!err && team) {
      console.log(team);
      //   console.log("Company successfully deleted");
      res.status(200).send("Team successfully deleted");
    } else {
      // console.log("error");
      res.status(404).send("error");
    }
  });
});

router.get("/getMember", async (req, res) => {
  console.log("---getMember---");
  Member.find({})
    .then((member) => {
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.delete("/deleteMember", async (req, res) => {
  console.log("---deleteMember---");
  //   const { _id } = req.body._id;
  //   console.log(req.body._id);
  console.log(req.body);
  Member.findOneAndRemove({ _id: req.body._id }, function (err, member) {
    if (!err && member) {
      console.log(member);
      //   console.log("Company successfully deleted");
      res.status(200).send("Member successfully deleted");
    } else {
      // console.log("error");
      res.status(404).send("error");
    }
  });
});

router.get("/getTask", async (req, res) => {
  console.log("---getTask---");
  Task.find({})
    .then((task) => {
      res.send(task);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.put("/addCompany", async (req, res) => {
  console.log(req.body);
  const { _id, name, bossId, companyPic } = req.body;
  let company;
  try {
    // if does not exist
    if (!_id || !name || !bossId || !companyPic) {
      res.status(400).send("Missing signup fields");
      return;
    }

    let previousCompany = await Company.findOne({ name: name });
    if (previousCompany) {
      return res.status(400).send("Duplicated Company Name");
    }

    previousCompany = await Company.findOne({ _id: _id });
    if (previousCompany) {
      return res.status(400).send("Duplicated Company ID");
    }
    company = await new Company({
      _id: _id,
      name: name,
      bossId: bossId,
      companyPic: companyPic,
    }).save();
    console.log(company);
  } catch (err) {
    console.log(err);
    console.log("Company added failed!");
    res.status(400).send();
    return;
  }
  // req.session.memberId = member._id;
  // console.log(req.session);
  // await req.session.save();
  return res.status(200).send("Company successfully added.");
});

router.put("/addTeam", async (req, res) => {
  console.log(req.body);
  const { _id, companyId, teamName, leader, teamPic, quote } = req.body;
  let team;
  try {
    // if does not exist
    if (!_id || !companyId || !teamName || !leader || !teamPic || !quote) {
      res.status(400).send("Missing signup fields");
      return;
    }

    let previousTeam = await Team.findOne({ _id: _id });
    if (previousTeam) {
      return res.status(400).send("Duplicated Team id");
    }

    let company = await Company.findOne({ _id: companyId });
    if (!company) {
      return res.status(400).send("The company does not exsit!");
    }

    let currentleader = await Member.findOne({ _id: leader });
    if (!currentleader) {
      return res.status(400).send("The leader does not exsit!");
    }
    //add Team to company list

    team = await new Team({
      _id: _id,
      companyId: companyId,
      teamName: teamName,
      leader: leader,
      teamPic: teamPic,
      quote: quote,
    }).save();
    console.log(team);
  } catch (err) {
    console.log(err);
    console.log("Team added failed!");
    res.status(400).send();
    return;
  }
  // req.session.memberId = member._id;
  // console.log(req.session);
  // await req.session.save();
  return res.status(200).send("Team successfully added.");
});

router.put("/addMember", async (req, res) => {
  console.log(req.body);
  const {
    _id,
    firstName,
    lastName,
    userName,
    rank,
    teamId,
    companyId,
    password,
    profilePic,
  } = req.body;
  let member;
  try {
    // if does not exist
    if (
      !_id ||
      !firstName ||
      !lastName ||
      !userName ||
      !rank ||
      !companyId ||
      !password ||
      !profilePic
    ) {
      res.status(400).send("Missing signup fields");
      return;
    }

    let previousMember = await Member.findOne({ _id: _id });
    if (previousMember) {
      return res.status(400).send("Duplicated Member id");
    }

    previousMember = await Member.findOne({ userName: userName });
    if (previousMember) {
      return res.status(400).send("Duplicated Username");
    }

    let company = await Company.findOne({ _id: companyId });
    if (!company) {
      return res.status(400).send("The company does not exsit!");
    }

    let team = await Team.findOne({ _id: teamId });
    if (!team) {
      return res.status(400).send("The Team does not exsit!");
    }

    //add member to team list

    member = await new Member({
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      rank: rank,
      teamId: teamId,
      companyId: companyId,
      password: password,
      profilePic: profilePic,
      isApproved: true,
    }).save();
    console.log(member);
  } catch (err) {
    console.log(err);
    console.log("Member added failed!");
    res.status(400).send();
    return;
  }
  // req.session.memberId = member._id;
  // console.log(req.session);
  // await req.session.save();
  return res.status(200).send("Member successfully added.");
});
module.exports = router;
