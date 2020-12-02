const express = require("express");
const router = express.Router();
const app = express();

const { Member } = require("../models/Member");
const { Company } = require("../models/Company");
const { nanoid } = require('nanoid')

var cors = require("cors");
require('isomorphic-fetch');

// localhost:5000/auth/check-session
router.get("/check-session", async (req, res) => {
    console.log("---in check-session---")
    console.log(req.session);
    if (req.session.memberId) {
        res.status(200).send({ curUserId: req.session.memberId });
    } else {
        res.status(401).send();
    }
});

router.put("/register", async (req, res) => {
    const id = nanoid()
    console.log(req.body);
    console.log(req.session.memberId);
    const { firstName, lastName, companyName, userName, password } = req.body;
    let member;
    try {
        // if does not exist
        if (!firstName || !lastName || !companyName || !userName || !password) {
            res.status(400).send("Missing signup fields");
            console.log(firstName, lastName, companyName, userName, password);
            return;
        }

        let previousMember = await Member.findOne({ userName: userName });
        if (previousMember) { return res.status(400).send("Duplicated username") }

        let targetCompany = await Company.findOne({ name: companyName });
        if (!targetCompany) { return res.status(400).send("Company not found with the given company name") }
        const companyId = targetCompany._id

        // Check companyName is actually a company in the database
        // const company = await Company.findById(companyName);
        // if (!company) return res.status(400).send("No such companyName");
        member = await new Member({
            _id: id,
            firstName: firstName,
            lastName: lastName,
            companyId: companyId,
            userName: userName,
            password: password,
        }).save();
        console.log(member);
    } catch (err) {
        console.log(err);
        console.log("sign up failed!");
        res.status(400).send();
        return;
    }
    // req.session.memberId = member._id;
    // console.log(req.session);
    await req.session.save();
    return res.status(200).send("Successfully registered.");
});

// router.post("/login", async (req, res) => {
//     console.log("Attempt login")
//     console.log(req.body)
//     const { userName, password } = req.body.data;

//     if (!userName || !password) {
//         console.log(userName, password)
//         res.status(400).send("Missing login fields");
//         return;
//     }
//     let member = await Member.findOne({ userName: userName, password: password });
//     if (!member) {
//         console.log("no such user")
//         res.status(400).send("Invalid login fields");
//         return;
//     }
//     req.session.memberId = member._id;
//     await req.session.save();
//     console.log("Successful login")
//     console.log(req.session)
//     res.status(200).send(member);
// });

router.post("/login", async (req, res) => {
    console.log("---Attempt login---");
    // console.log(req);
    console.log(req.body);
    const { userName, password } = req.body.data;

    if (!userName || !password) {
        console.log(userName, password);
        res.status(400).send("Missing login fields");
        return;
    }
    let member = await Member.findOne({ userName: userName, password: password });
    if (!member) {
        console.log("no such user");
        res.status(400).send("Invalid login fields");
        return;
    }
    req.session.memberId = member._id;
    await req.session.save();
    console.log("req.session")
    console.log(req.session)
    // await req.session.save();
    console.log("Successful login");
    // test code
    // try {
    //     const response = await fetch("http://localhost:5000/auth/check-session");
    //     console.log(response);
    // } catch (err) {
    //     console.log(err);
    // }

    res.send(member);
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Cannot logout");
            return;
        }
    });

    res.status(200).send("Successful logout");
});

module.exports = router;
