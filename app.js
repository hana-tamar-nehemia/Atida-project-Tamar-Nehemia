//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/atidaDB", {
  useNewUrlParser: true,
});

// Define the schema for user data
const userDataSchema = {
  personalDetails: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    address: {
      city: String,
      street: String,
      homeNumber: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },

    phoneNumber: String,
    cellPhoneNumber: {
      type: String,
      required: true,
    },
  },
  coronaInfo: {
    vaccination1: {
      date: Date,
      manufacturer: String,
    },
    vaccination2: {
      date: Date,
      manufacturer: String,
    },
    vaccination3: {
      date: Date,
      manufacturer: String,
    },
    vaccination4: {
      date: Date,
      manufacturer: String,
    },
    positiveDate: Date,
    recoveryDate: Date,
  },
};

// Create a model for the user data
const User = mongoose.model("User", userDataSchema);

//number of users who are not vaccinated
var NotVaccinated = 0;

// Declare variables for graph data
var arrayGraph = [["Day", "People"]];

// Handle GET requests to the home page
app.get("/", async function (req, res) {
  // Call the notVaccinated function to get the number of people who haven't been vaccinated.
  await notVaccinated();
  // Find all users in the database and render
  // the home page with the data
  User.find({}).then(function (found) {
    res.render("home", {
      numOfNotVaccinated: NotVaccinated,
      allUsers: found,
    });
  });
});

// Handle GET requests to draw the graph
app.get("/drawGraph", async function (req, res) {
  // Call the drawGraph function to generate the graph data.
  await drawGraph();
  console.log(arrayGraph);
  await res.send(arrayGraph);
  arrayGraph = [["Day", "People"]];
});

// Handle GET requests to add a new user
app.get("/addUser", function (req, res) {
  res.render("addUser", {});
});

// Handle POST requests to add a new user
app.post("/addUser", function (req, res) {
  // Create a new user object from the form data
  const newUser = new User({
    personalDetails: {
      name: req.body.userName,
      id: req.body.userId,
      address: {
        city: req.body.city,
        street: req.body.street,
        homeNumber: req.body.numberHome,
      },
      dateOfBirth: req.body.birthDate,
      phoneNumber: req.body.phone,
      cellPhoneNumber: req.body.cellPhone,
    },
    coronaInfo: {
      vaccination1: {
        date: req.body.DateVfvaccination1,
        manufacturer: req.body.manufacturer1,
      },
      vaccination2: {
        date: req.body.DateVfvaccination2,
        manufacturer: req.body.manufacturer2,
      },
      vaccination3: {
        date: req.body.DateVfvaccination3,
        manufacturer: req.body.manufacturer3,
      },
      vaccination4: {
        date: req.body.DateVfvaccination4,
        manufacturer: req.body.manufacturer4,
      },
      positiveDate: req.body.startCoronaDate,
      recoveryDate: req.body.recoveryCoronaDate,
    },
  });

  //save the new user to the database
  newUser.save();
  res.redirect("/");
});

// Define a route to find a user by ID
app.get("/pullUser/:id", function (req, res) {
  // Find a user with the specified ID
  User.findOne({
    "personalDetails.id": req.query.id,
  }).then(function (found) {
    console.log(found);
    res.send(found);
  });
});

// find the number of positive cases per day
async function drawGraph() {
  var now = new Date();
  const dayNumber = now.getDate();
  for (let i = 1; i <= dayNumber; i++) {
    // Find users with a positive COVID-19 test result on the current day
    await User.find({
      "coronaInfo.positiveDate": {
        $gte: new Date(now.getFullYear(), now.getMonth(), i),
        $lt: new Date(now.getFullYear(), now.getMonth(), i + 1),
      },
    }).then(async function (foundUsers) {
      // Add the number of found users to the graph data
      await arrayGraph.push([i, foundUsers.length]);
    });
  }
}
//count the number of users
//who have not received any COVID-19 vaccinations
async function notVaccinated() {
  await User.find({
    "coronaInfo.vaccination1.date": null,
    "coronaInfo.vaccination2.date": null,
    "coronaInfo.vaccination3.date": null,
    "coronaInfo.vaccination4.date": null,
  })
    .count()
    .then(function (count) {
      // Set variable NotVaccinated to the count
      // of unvaccinated users
      NotVaccinated = count;
    });
}

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
