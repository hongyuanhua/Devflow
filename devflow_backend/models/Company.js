const mongoose = require("mongoose");

const Company = mongoose.model("Company", {
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  members: [String],
  bossId: {
    type: String,
  },
  teams: [String],
  companyPic: {
    type: String,
    required: true,
  },
});

module.exports = { Company };
