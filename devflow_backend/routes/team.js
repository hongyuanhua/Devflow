const express = require("express");
const router = express.Router();
const { Team } = require("../models/Team.js");

router.get("/all", async (req, res) => {
  console.log("---get all teams---");
  Team.find()
    .then((teams) => {
      if (!teams) {
        console.log("No such teams");
        return res.status(404).send("No such teams");
      }
      console.log("Success in geting all teams");
      console.log(teams);
      res.send(teams);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/:id", async (req, res) => {
  console.log("---Get team by id---");
  const teamId = req.params.id;
  Team.findById(teamId)
    .then((team) => {
      if (!team) {
        return res.status(404).send("No such team");
      }
      console.log("success get team by id");
      res.send(team);
    })
    .catch((err) => res.status(500).send("Server err"));
});
router.get("/company/:id", async (req, res) => {
  console.log("---Get team by company id---");
  const company = req.params.id;
  console.log(company);
  Team.find({ companyId: company })
    .then((team) => {
      if (!team) {
        return res.status(404).send("No such team");
      }
      console.log("success get team by id");
      res.send(team);
    })
    .catch((err) => res.status(500).send("Server err"));
});
module.exports = router;
