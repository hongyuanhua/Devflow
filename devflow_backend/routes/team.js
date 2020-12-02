const express = require("express");
const router = express.Router();
const { Team } = require("../models/Team.js");

router.get("/:id", async (req, res) => {
  console.log("---Get team by id---")
  const teamId = req.params.id;
  Team.findById(teamId)
    .then(team => {
      if (!team) {
        return res.status(404).send("No such team");
      }
      console.log("success get team by id")
      res.send(team);
    })
    .catch(err => res.status(500).send("Server err"))
});

router.get("/all", async (req, res) => {
  Team.find()
    .then((teams) => {
      if (!teams) {
        return res.status(404).send("No such teams");
      }
      res.send(teams);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.get("/:id", async (req, res) => {
  const teamId = req.params.id;
  Team.findById(teamId)
    .then((Company) => {
      if (!Company) {
        return res.status(404).send("No such team");
      }
      res.send(team);
    })
    .catch((err) => res.status(500).send("Server err"));
});

module.exports = router;
