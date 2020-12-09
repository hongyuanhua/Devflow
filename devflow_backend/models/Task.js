const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Task = mongoose.model("Task", {
  _id: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  usedTime: {
    type: Number,
    required: true,
  },
  assignedToId: {
    type: String,
  },
  assignedById: {
    type: String,
    required: true,
  },
  taskDetail: {
    type: String,
  },
  isFinish: {
    type: String,
    required: true,
  },
});

module.exports = { Task };
