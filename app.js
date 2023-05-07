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

mongoose.connect("mongodb://127.0.0.1:27017/atidaDB", {
  useNewUrlParser: true,
});

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
const arrayGraph = [["Price", "Size"]];
const User = mongoose.model("User", userDataSchema);

app.get("/", async function (req, res) {
  var NotVaccinated = 0;
  var now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 2);
  const dayNumber = now.getDate();

  for (let i = 1; i <= dayNumber; i++) {
    console.log(i);
    await User.find({
      "coronaInfo.positiveDate": {
        $gte: new Date(now.getFullYear(), now.getMonth(), i + 1),
        $lt: new Date(now.getFullYear(), now.getMonth(), i + 2),
      },
    }).then(async function (foundUsers) {
      console.log(i);
      await arrayGraph.push([i, foundUsers.length]);
      console.log(arrayGraph);
    });
  }

  await User.find({
    "coronaInfo.vaccination1.date": null,
    "coronaInfo.vaccination2.date": null,
    "coronaInfo.vaccination3.date": null,
    "coronaInfo.vaccination4.date": null,
  })
    .count()
    .then(function (count) {
      NotVaccinated = count;
      console.log("NotVaccinated  " + count);
      res.render("home", { numOfNotVaccinated: NotVaccinated });
    });
});

app.get("/addUser", function (req, res) {
  res.render("addUser", {});
});

app.post("/addUser", function (req, res) {
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

  newUser.save();
  res.redirect("/");
});

app.post("/pullUser", function (res, req) {
  User.findOne({ "personalDetails.id": req.body.user_id }).then(function (
    err,
    found
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(found);
    }
  });
  res.redirect("/");
});

app.use("/sickArray", (req, res, next) => {
  res.json(arrayGraph);
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
