const root = require("express").Router();

// User Authentication
const UserAuth = require("./userAuth");
root.use("/user", UserAuth);

// User Dashboard
const Dashboard = require("./userDashboard");
root.use("/dashboard", Dashboard);

module.exports = root;
