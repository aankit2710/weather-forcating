const path = require("path");
const express = require("express");
const hbs = require("hbs");
const foreCast = require("./utils/foreCast");
const geoCode = require("./utils/geoCode");

const app = express();

const port = process.env.PORT || 3000
// Define path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SetUp handlebars Engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setUp static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get("/weather", (req, res) => {
//   res.send("Weather App !!!");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Wether App",
    name: "Ankit Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ankit Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some Usefull text that will help you",
    name: "Ankit Kumar",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not Found",
    name: "Ankit Kumar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the Address You want to search",
    });
  }

  geoCode(req.query.address, (error, { lattitude, longitude, placeName } = {}) => {
    if (error) {
      return res.send({ error });
    }
    foreCast(lattitude, longitude, (error, { temperature, conditions, precipprob, description, humidity, maxTemp, minTemp }) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        temperature,
        conditions,
        precipprob,
        description,
        humidity,
        maxTemp,
        minTemp,
        location: placeName,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You mist provide the search data",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not Found",
    name: "Ankit Kumar",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
