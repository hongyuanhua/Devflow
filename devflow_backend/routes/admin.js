const express = require("express");
const router = express.Router();
const app = express();
const { nanoid } = require("nanoid");

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
  Member.find({ isApproved: true })
    .then((member) => {
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.get("/getPendingMember", async (req, res) => {
  console.log("---getPendingMember---");
  Member.find({ isApproved: false })
    .then((member) => {
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.post("/approvePendingMember", async (req, res) => {
  console.log("---approvePendingMember---");
  const { _id } = req.body;
  Member.find({ _id: _id })
    .then((member) => {
      console.log(member);
      const target = member[0];
      target.isApproved = true;
      target.save();
      // return target;
    })
    .catch((err) => {
      console.log("fail approve user");

      res.status(500).send("Server err");
    });
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

router.delete("/deleteTask", async (req, res) => {
  console.log("---deleteTask---");
  //   const { _id } = req.body._id;
  //   console.log(req.body._id);
  console.log(req.body);
  Task.findOneAndRemove({ _id: req.body._id }, function (err, task) {
    if (!err && task) {
      console.log(task);
      //   console.log("Company successfully deleted");
      res.status(200).send("Task successfully deleted");
    } else {
      // console.log("error");
      res.status(404).send("error");
    }
  });
});

router.put("/addCompany", async (req, res) => {
  console.log(req.body);
  const { name, companyPic } = req.body;
  let company;
  try {
    // if does not exist
    if (!name || !companyPic) {
      res.status(400).send("Missing signup fields");
      return;
    }

    let previousCompany = await Company.findOne({ name: name });
    if (previousCompany) {
      return res.status(400).send("Duplicated Company Name");
    }

    // previousCompany = await Company.findOne({ _id: _id });
    // if (previousCompany) {
    //   return res.status(400).send("Duplicated Company ID");
    // }
    company = await new Company({
      _id: nanoid(),
      name: name,
      bossId: "",
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

router.post("/modifyCompany", async (req, res) => {
  console.log("---modifyCompany---");
  console.log(req.body);
  const { _id, name, companyPic, bossId } = req.body;
  Company.find({ _id: _id })
    .then((company) => {
      console.log("success modify company");
      console.log(company);
      const target = company[0];
      target.name = name;
      target.bossId = bossId;
      target.companyPic = companyPic;
      target.save();
      // return target;
    })
    .catch((err) => {
      console.log("fail modify company");

      res.status(500).send("Server err");
    });
});

router.put("/addTeam", async (req, res) => {
  console.log(req.body);
  const { companyId, teamName, leader, teamPic, quote } = req.body;
  let team;
  try {
    // if does not exist
    if (!companyId || !teamName || !leader || !teamPic || !quote) {
      res.status(400).send("Missing signup fields");
      return;
    }

    // let previousTeam = await Team.findOne({ _id: _id });
    // if (previousTeam) {
    //   return res.status(400).send("Duplicated Team id");
    // }

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
      _id: nanoid(),
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

router.post("/modifyTeam", async (req, res) => {
  console.log(req.body);
  const { _id, companyId, teamName, leader, teamPic, quote } = req.body;
  // if does not exist
  if (!companyId || !teamName || !leader || !teamPic || !quote) {
    res.status(400).send("Missing signup fields");
    return;
  }
  //add Team to company list

  Team.find({ _id: _id })
    .then((team) => {
      const target = team[0];
      target.companyId = companyId;
      target.teamName = teamName;
      target.leader = leader;
      target.teamPic = teamPic;
      target.quote = quote;
      target.save();
    })
    .catch((err) => {
      console.log("fail modify team");

      res.status(500).send("Server err");
    });
});

router.put("/addMember", async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    userName,
    rank,
    password,
    profilePic,
  } = req.body;
  let member;
  try {
    // if does not exist
    if (!firstName || !lastName || !userName || !password || !profilePic) {
      res.status(400).send("Missing signup fields");
      return;
    }

    // let previousMember = await Member.findOne({ _id: _id });
    // if (previousMember) {
    //   return res.status(400).send("Duplicated Member id");
    // }

    previousMember = await Member.findOne({ userName: userName });
    if (previousMember) {
      return res.status(400).send("Duplicated Username");
    }

    // let company = await Company.findOne({ _id: companyId });
    // if (!company) {
    //   return res.status(400).send("The company does not exsit!");
    // }

    // let team = await Team.findOne({ _id: teamId });
    // if (!team) {
    //   return res.status(400).send("The Team does not exsit!");
    // }

    //add member to team list

    member = await new Member({
      _id: nanoid(),
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      rank: rank,
      teamId: "",
      companyId: "",
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

router.post("/modifyMember", async (req, res) => {
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
  //add Member to company list

  Member.find({ _id: _id })
    .then((member) => {
      const target = member[0];
      target.firstName = firstName;
      target.lastName = lastName;
      target.userName = userName;
      target.rank = rank;
      target.teamId = teamId;
      target.companyId = companyId;
      target.password = password;
      target.profilePic = profilePic;
      target.save();
    })
    .catch((err) => {
      console.log("fail modify member");

      res.status(500).send("Server err");
    });
});
module.exports = router;
