const express = require("express");
const router = express.Router();
const app = express();

const { Member } = require("../models/Member");
const { Company } = require("../models/Company");
const { Team } = require("../models/Team");
const { Task } = require("../models/Task");

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
module.exports = router;
