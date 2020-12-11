// Set up router
const path = require("path");

const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./routes/auth");
const member = require("./routes/member");
const company = require("./routes/company");
const notification = require("./routes/notification");
const task = require("./routes/task");
const admin = require("./routes/admin");
const team = require("./routes/team");

const { Company } = require("./models/Company");
const { Member } = require("./models/Member");
const { Notification } = require("./models/Notification");
const { Task } = require("./models/Task");
const { Team } = require("./models/Team");

// Set up database
const mongoose = require("mongoose");
const MONGODB =
  "mongodb+srv://team34:team34Password@devflow.oddf0.mongodb.net/devflow";
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(MONGODB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB", err));

const port = process.env.PORT || 5000;
console.log("starting the server...");
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const { nanoid } = require("nanoid");
console.log(nanoid());

// start routing
const sessionChecker = (req, res, next) => {
  console.log(req.session);
  if (!req.session.memberId) {
    res.status(401).send("Not logged in");
  } else {
    next();
  }
};

app.use(
  session({
    secret: "our hardcoded secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: false,
      // secure: false,
    },
  })
);

// // Express middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Session checking
// app.use("/api", sessionChecker);

// Routing
app.use(express.static(path.join(__dirname, "../devflow/build")));
app.use("/auth", auth);
app.use("/api/member", member);
app.use("/api/company", company);
app.use("/api/team", team);
app.use("/api/notification", notification);
app.use("/api/task", task);
app.use("/admin", admin);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + './../devflow/build/index.html'))
})

