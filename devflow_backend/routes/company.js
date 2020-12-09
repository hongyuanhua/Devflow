const express = require("express");
const router = express.Router();
const { Company } = require("../models/Company.js");
const { Member } = require("../models/Member.js");

router.get("/all", async (req, res) => {
  console.log("---get all companies---");
  Company.find()
    .then((companys) => {
      if (!companys) {
        console.log("No such companys");
        return res.status(404).send("No such companys");
      }
      console.log("Success in geting all companies");
      console.log(companys);
      res.send(companys);
    })
    .catch((err) => res.status(500).send("Server err"));
});

router.get("/company-members", async (req, res) => {
  var companyId = req.query.company_id;
  Company.findById(companyId)
    .then((company) => {
      if (!company) {
        return res.status(404).send("No such company");
      }
      members = company.members;
      Member.find(
        {
          _id: { $in: members },
        },
        function (err, docs) {
          res.send({ members: docs });
        }
      );
    })
    .catch((err) => res.status(500).send("Server err" + err));
});

router.get("/:id", async (req, res) => {
  console.log("---get company by id---");
  const companyId = req.params.id;
  Company.findById(companyId)
    .then((company) => {
      if (!company) {
        console.log("No such companys");
        return res.status(404).send("No such company");
      }
      console.log("Success in geting company in id");
      console.log(company);
      res.send(company);
    })
    .catch((err) => res.status(500).send("Server err"));
});

module.exports = router;
