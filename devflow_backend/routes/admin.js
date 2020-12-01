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
      console.log(firstName, lastName, companyName, userName, password);
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
    // let targetCompany = await Company.findOne({ name: companyName });
    // if (!targetCompany) {
    //   return res
    //     .status(400)
    //     .send("Company not found with the given company name");
    // }
    // const companyId = targetCompany._id;

    // Check companyName is actually a company in the database
    // const company = await Company.findById(companyName);
    // if (!company) return res.status(400).send("No such companyName");
    company = await new Company({
      _id: _id,
      name: name,
      bossId: bossId,
      companyPic: companyPic,
    }).save();
    console.log(company);
  } catch (err) {
    console.log(err);
    console.log("sign up failed!");
    res.status(400).send();
    return;
  }
  // req.session.memberId = member._id;
  // console.log(req.session);
  // await req.session.save();
  return res.status(200).send("Company successfully added.");
});

module.exports = router;
