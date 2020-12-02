const express = require("express");
const router = express.Router();
const { Company } = require("../models/Company.js");

router.get("/all", async (req, res) => {
    Company.find()
        .then(companys => {
            if (!companys) {
                return res.status(404).send("No such companys");
            }
            res.send(companys);
        })
        .catch(err => res.status(500).send("Server err"))
});

router.get("/:id", async (req, res) => {
    const companyId = req.params.id;
    Company.findById(companyId)
        .then(company => {
            if (!company) {
                return res.status(404).send("No such company");
            }
            res.send(company);
        })
        .catch(err => res.status(500).send("Server err"))
});

module.exports = router;