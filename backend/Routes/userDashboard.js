const express = require("express");
// middleware for validate the user
const validateToken = require("../Middlewares/validateAuth");
const Dashboard = express.Router();
// schemas
const Project = require("../Schema/projectSchema");

// create project
Dashboard.post("/createproject", validateToken, async (req, res) => {
  try {
    const { ProjectName } = await req.body;
    // projects  limit checking
    const checkLimit = await Project.find({
      UserId: req.userId,
    }).countDocuments();

    const createProject = new Project({
      UserId: req.userId,
      ProjectName,
    });
    // if project count less than 4 then create project
    if (checkLimit != 4) {
      await createProject
        .save()
        .then(() => {
          return res.json({
            type: "success",
            message: "Project Created Successfully",
          });
        })
        .catch((err) => {
          return res.json({
            type: "Fail",
            message: "Failed creating project try after sometime",
          });
        });
    } else {
      return res.json({
        type: "limit",
        message: "you can only create 4 projects",
      });
    }
  } catch (error) {
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again later ",
      })
      .status(500);
  }
});

// create a task
Dashboard.post("/project/createtask", validateToken, async (req, res) => {
  try {
    const { pid, Title, Description } = await req.body;
    // task Object
    const task = {
      idx: Date.now(),
      Title,
      Description,
      status: "pending",
      createdAt: new Date(),
      CompletedAt: "",
    };
    // updating the tasks in project schema if the project exists
    await Project.findOneAndUpdate(
      { $and: [{ _id: pid }, { UserId: req.userId }] },
      { $push: { Tasks: task } }
    )
      .lean()
      .then((da) => {
        return res.json({
          type: "success",
          message: "Task Created",
        });
      })
      .catch((err) => {
        return res.json({
          type: "error",
          message: "something wrong while creating task try again",
        });
      });
  } catch (error) {
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again later ",
      })
      .status(500);
  }
});

// get all tasks from specific project
Dashboard.get("/project/tasks/:pid", validateToken, async (req, res) => {
  try {
    const projectId = await req.params.pid;
    const userId = await req.userId;
    // ensuring that user id and project id is single user
    // this may cause IDOR Vuln
    const tasks = await Project.findOne({
      $and: [{ _id: projectId }, { UserId: userId }],
    });
    if (!tasks) {
      return res.json({
        type: "Error",
        message: "invalid request",
      });
    }
    if (tasks.Tasks.length > 0) {
      return res.json({
        type: "Data",
        response: tasks.Tasks,
      });
    } else {
      return res.json({
        type: "Data",
        response: "Empty Tasks",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again later ",
      })
      .status(500);
  }
});

Dashboard.get("/projects", validateToken, async (req, res) => {
  try {
    const userId = await req.userId;
    const userProjects = await Project.find({ UserId: userId });
    if (userProjects) {
      return res.json({
        type: "User Projects",
        data: userProjects,
      });
    }
  } catch (error) {
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again later ",
      })
      .status(500);
  }
});

// Updating task status
Dashboard.put("/project/taskstatus/:pid", validateToken, async (req, res) => {
  try {
    const { tid, status } = await req.body;
    const userId = await req.userId;
    // find task data and update the status
    await Project.findOneAndUpdate(
      {
        $and: [
          { _id: req.params.pid },
          { UserId: userId },
          { "Tasks.idx": tid },
        ],
      },
      {
        $set: {
          "Tasks.$.status": status,
          "Tasks.$.CompletedAt": new Date(),
        },
      }
    )
      .then((da) => {
        if (!da) {
          return res.json({
            type: "error",
            message: "Invalid request ",
          });
        }
        return res.json({
          type: "success",
          message: "Task Status Updated",
        });
      })
      .catch((err) => {
        return res.json({
          type: "Error",
          message: "Task Updating Error try again",
        });
      });
    //     await Project.updateOne(
    //       { _id: req.params.pid },
    //       {
    //         $set: {
    //           "Tasks.$[task].status": status,
    //           "Tasks.$[task].CompletedAt": new Date(),
    //         },
    //       },
    //       {
    //         arrayFilters: [{ "task.idx": tid }],
    //       }
    //     );
  } catch (error) {
    console.log(error);
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again later ",
      })
      .status(500);
  }
});

// Delete task
Dashboard.delete(
  "/project/taskdelete/:pid/:tid",
  validateToken,
  async (req, res) => {
    try {
      const { pid, tid } = await req.params;
      const userId = await req.userId;

      // const userId = await req.userId;
      await Project.findOne({
        $and: [{ _id: pid }, { UserId: userId }],
      })
        .findOneAndUpdate({
          $pull: {
            Tasks: { idx: Number(tid) },
          },
        })
        .then(() => {
          return res.json({
            type: "success",
            message: "Task Deleted",
          });
        });
    } catch (error) {
      return res
        .json({
          type: "Server Error",
          message: "Something Wrong try again later ",
        })
        .status(500);
    }
  }
);
module.exports = Dashboard;
