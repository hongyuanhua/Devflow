const express = require("express");
const router = express.Router();
const { Member } = require("../models/Member.js");

// localhost:5000/api/member/1

router.get("/all", async (req, res) => {
  console.log("---get all teams---");
  Member.find()
    .then((members) => {
      if (!members) {
        console.log("No such members");
        return res.status(404).send("No such members");
      }
      console.log("Success in geting all members");
      console.log(members);
      res.send(members);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.get("/:id", async (req, res) => {
  const memberId = req.params.id;
  Member.findById(memberId)
    .then((member) => {
      if (!member) {
        return res.status(404).send("No such member");
      }
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/company/:id", async (req, res) => {
  const company = req.params.id;
  Member.find({ companyId: company })
    .then((member) => {
      if (!member) {
        return res.status(404).send("No such member");
      }
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.get("/team/:id", async (req, res) => {
  const team = req.params.id;
  Member.find({ teamId: team })
    .then((member) => {
      if (!member) {
        return res.status(404).send("No such member");
      }
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.get("/noTeamCompany/:id", async (req, res) => {
  const company = req.params.id;
  Member.find({ companyId: company, teamId: "" })
    .then((member) => {
      if (!member) {
        return res.status(404).send("No such member");
      }
      res.send(member);
    })
    .catch((err) => res.status(500).send("Server err"));
});

module.exports = router;
