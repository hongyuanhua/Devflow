const express = require("express");
const router = express.Router();
const { Member } = require("../models/Member.js");

// localhost:5000/api/member/1
// router.get("/all", async (req, res) => {
//     Member.find()
//         .then(members => {
//             console.log(member)
//             res.send(members);
//         })
//         .catch(err => res.status(500).send("Server err"))
// });

router.get("/:id", async (req, res) => {
    const memberId = req.params.id;
    Member.findById(memberId)
        .then(member => {
            if (!member) {
                return res.status(404).send("No such member");
            }
            res.send(member);
        })
        .catch(err => res.status(500).send("Server err"))
});

// router.put("/", async (req, res) => {
//     const memberId = req.body.memberId;
//     const
// })
module.exports = router;