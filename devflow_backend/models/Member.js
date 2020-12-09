const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Member = mongoose.model("Member", {
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    default: 3,
  },
  teamId: {
    type: String,
    default: "",
  },
  companyId: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = { Member };
