const mongoose = require("mongoose");

const Project = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ProjectName: {
      type: String,
      required: true,
    },
    Tasks: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AllProjects", Project);
